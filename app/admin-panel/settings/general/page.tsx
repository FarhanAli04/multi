"use client"

import { Save, Upload } from "lucide-react"

export default function GeneralSettings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">General Settings</h1>
        <p className="text-muted-foreground mt-1">Configure website-wide settings</p>
      </div>

      {/* Logo & Branding */}
      <div className="admin-panel-table p-6 space-y-6">
        <h2 className="text-xl font-bold">Logo & Branding</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Website Logo</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
              <Upload size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm">Click to upload logo</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Favicon</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
              <Upload size={32} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm">Click to upload favicon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Website Info */}
      <div className="admin-panel-table p-6 space-y-4">
        <h2 className="text-xl font-bold">Website Information</h2>

        <div>
          <label className="block text-sm font-medium mb-2">Website Name</label>
          <input type="text" defaultValue="Syed Asad Raza" className="admin-panel-search-input w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tagline</label>
          <input
            type="text"
            defaultValue="Your Premier Multi-Vendor Marketplace"
            className="admin-panel-search-input w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Currency</label>
            <select className="admin-panel-search-input w-full">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>PKR (Rs)</option>
              <option>GBP (£)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Timezone</label>
            <select className="admin-panel-search-input w-full">
              <option>UTC</option>
              <option>EST</option>
              <option>PST</option>
              <option>IST</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="admin-panel-table p-6 space-y-4">
        <h2 className="text-xl font-bold">Contact Information</h2>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input type="email" defaultValue="admin@sar.com" className="admin-panel-search-input w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input type="tel" defaultValue="+1 234 567 8900" className="admin-panel-search-input w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <textarea
            defaultValue="123 Business Street, City, Country"
            className="admin-panel-search-input w-full"
            rows={3}
          />
        </div>
      </div>

      {/* Policies */}
      <div className="admin-panel-table p-6 space-y-4">
        <h2 className="text-xl font-bold">Policies & Terms</h2>

        <div>
          <label className="block text-sm font-medium mb-2">Refund Policy</label>
          <textarea placeholder="Enter refund policy..." className="admin-panel-search-input w-full" rows={4} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Return Policy</label>
          <textarea placeholder="Enter return policy..." className="admin-panel-search-input w-full" rows={4} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Terms & Conditions</label>
          <textarea placeholder="Enter terms and conditions..." className="admin-panel-search-input w-full" rows={4} />
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
