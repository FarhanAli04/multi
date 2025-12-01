"use client"

import { Save, Upload } from "lucide-react"

export default function HomepageSettings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Home Page Settings</h1>
        <p className="text-muted-foreground mt-1">Customize homepage layout and content</p>
      </div>

      {/* Hero Banner */}
      <div className="admin-panel-table p-6 space-y-4">
        <h2 className="text-xl font-bold">Hero Banner</h2>

        <div>
          <label className="block text-sm font-medium mb-2">Banner Image</label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
            <Upload size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm">Click to upload banner image</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Headline</label>
          <input
            type="text"
            defaultValue="Welcome to Syed Asad Raza Marketplace"
            className="admin-panel-search-input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Subheadline</label>
          <input
            type="text"
            defaultValue="Discover premium products from trusted sellers"
            className="admin-panel-search-input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">CTA Button Text</label>
          <input type="text" defaultValue="Shop Now" className="admin-panel-search-input w-full" />
        </div>
      </div>

      {/* Featured Sections */}
      <div className="admin-panel-table p-6 space-y-4">
        <h2 className="text-xl font-bold">Display Settings</h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Show Flash Deals</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Show Featured Categories</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Show Featured Products</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span>Show Promotional Banners</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="admin-panel-btn-primary flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  )
}
