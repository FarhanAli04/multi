import { getSupabaseServerClient } from "@/lib/supabase-server"
import { getCurrentUser } from "@/lib/auth-utils"

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await getSupabaseServerClient()

    const { data: conversations, error } = await supabase
      .from("conversations")
      .select("*")
      .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)

    if (error) throw error

    return Response.json(conversations)
  } catch (error) {
    return Response.json({ error: "Failed to fetch conversations" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { receiverId, content } = await request.json()
    const supabase = await getSupabaseServerClient()

    // Find or create conversation
    const { data: existingConv } = await supabase
      .from("conversations")
      .select("*")
      .or(
        `and(participant_1_id.eq.${user.id},participant_2_id.eq.${receiverId}),and(participant_1_id.eq.${receiverId},participant_2_id.eq.${user.id})`,
      )
      .single()

    let conversationId: string

    if (existingConv) {
      conversationId = existingConv.id
    } else {
      const { data: newConv, error: convError } = await supabase
        .from("conversations")
        .insert({
          participant_1_id: user.id,
          participant_2_id: receiverId,
        })
        .select()
        .single()

      if (convError) throw convError
      conversationId = newConv.id
    }

    // Insert message
    const { data: message, error: msgError } = await supabase
      .from("messages")
      .insert({
        sender_id: user.id,
        receiver_id: receiverId,
        content,
        message_type: "text",
      })
      .select()
      .single()

    if (msgError) throw msgError

    return Response.json(message)
  } catch (error) {
    return Response.json({ error: "Failed to send message" }, { status: 500 })
  }
}
