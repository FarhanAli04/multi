"use client"

import { Trash2, RotateCw } from "lucide-react"
import { useState } from "react"

export default function CacheManagement() {
  const [clearing, setClearing] = useState(false)

  const cacheItems = [
    { name: "Page Cache", size: "245 MB", description: "Cached page content" },
    { name: "Product Cache", size: "512 MB", description: "Product listings and details" },
    { name: "Image Cache", size: "1.2 GB", description: "Optimized product images" },
    { name: "Database Cache", size: "89 MB", description: "Query results" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Clear Cache</h1>
        <p className="text-muted-foreground mt-1">Improve performance by managing system cache</p>
      </div>

      {/* Cache Items */}
      <div className="space-y-4">
        {cacheItems.map((item) => (
          <div key={item.name} className="admin-panel-table p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <p className="text-xs text-muted-foreground mt-1">Size: {item.size}</p>
            </div>
            <button className="admin-panel-btn-danger flex items-center gap-2">
              <Trash2 size={18} />
              Clear
            </button>
          </div>
        ))}
      </div>

      {/* Clear All */}
      <div className="admin-panel-table p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-200 dark:border-orange-900">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Clear All Cache</h3>
            <p className="text-sm text-muted-foreground">This will clear all cached data. Use cautiously.</p>
          </div>
          <button className="admin-panel-btn-danger flex items-center gap-2" onClick={() => setClearing(!clearing)}>
            {clearing ? (
              <>
                <RotateCw size={18} className="animate-spin" />
                Clearing...
              </>
            ) : (
              <>
                <Trash2 size={18} />
                Clear All
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
