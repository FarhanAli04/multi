"use client"

import { Plus, Edit2, Trash2, Search, RefreshCw, Download, Eye, ToggleLeft, ToggleRight, FolderOpen, Tag, TrendingUp, MoreVertical, Filter, Star } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  products: number;
  subcategories: number;
  status: "Active" | "Inactive";
  parent: string;
  image: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  sortOrder: number;
}

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  products: number;
}

export default function CategoriesManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Electronics",
      slug: "electronics",
      description: "Electronic devices, gadgets, and accessories",
      products: 245,
      subcategories: 8,
      status: "Active",
      parent: "None",
      image: "/images/electronics.jpg",
      featured: true,
      createdAt: "Jan 15, 2024",
      updatedAt: "Dec 10, 2024",
      seoTitle: "Best Electronics Online - Gadgets & Devices",
      seoDescription: "Shop for latest electronics, smartphones, laptops, and more",
      sortOrder: 1
    },
    {
      id: 2,
      name: "Fashion",
      slug: "fashion",
      description: "Clothing, shoes, and fashion accessories",
      products: 512,
      subcategories: 12,
      status: "Active",
      parent: "None",
      image: "/images/fashion.jpg",
      featured: true,
      createdAt: "Jan 20, 2024",
      updatedAt: "Dec 12, 2024",
      seoTitle: "Fashion Trends - Clothing & Accessories",
      seoDescription: "Discover latest fashion trends, clothing, shoes, and accessories",
      sortOrder: 2
    },
    {
      id: 3,
      name: "Home & Garden",
      slug: "home-garden",
      description: "Home decor, furniture, and garden supplies",
      products: 189,
      subcategories: 5,
      status: "Inactive",
      parent: "None",
      image: "/images/home.jpg",
      featured: false,
      createdAt: "Feb 10, 2024",
      updatedAt: "Nov 28, 2024",
      seoTitle: "Home & Garden Supplies",
      seoDescription: "Quality home decor, furniture, and garden products",
      sortOrder: 3
    },
  ])

  const [subcategories] = useState<Subcategory[]>([
    { id: 1, name: "Smartphones", slug: "smartphones", categoryId: 1, products: 89 },
    { id: 2, name: "Laptops", slug: "laptops", categoryId: 1, products: 67 },
    { id: 3, name: "Men's Clothing", slug: "mens-clothing", categoryId: 2, products: 234 },
    { id: 4, name: "Women's Clothing", slug: "womens-clothing", categoryId: 2, products: 278 },
  ])

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || category.status === statusFilter
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    switch(sortBy) {
      case "name": return a.name.localeCompare(b.name)
      case "products": return b.products - a.products
      case "subcategories": return b.subcategories - a.subcategories
      case "sortOrder": return a.sortOrder - b.sortOrder
      default: return 0
    }
  })

  const handleView = (category: Category) => {
    setSelectedCategory(category)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory({...category})
    setIsEditDialogOpen(true)
  }

  const handleDelete = (categoryId: number) => {
    if (confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      setCategories(categories.filter(category => category.id !== categoryId))
    }
  }

  const handleToggleStatus = (categoryId: number) => {
    setCategories(categories.map(category =>
      category.id === categoryId
        ? { ...category, status: category.status === "Active" ? "Inactive" : "Active" }
        : category
    ))
  }

  const handleToggleFeatured = (categoryId: number) => {
    setCategories(categories.map(category =>
      category.id === categoryId ? { ...category, featured: !category.featured } : category
    ))
  }

  const handleSaveEdit = () => {
    if (editingCategory) {
      setCategories(categories.map(category => 
        category.id === editingCategory.id ? editingCategory : category
      ))
      setIsEditDialogOpen(false)
      setEditingCategory(null)
    }
  }

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      name: editingCategory?.name || "New Category",
      slug: editingCategory?.slug || "new-category",
      description: editingCategory?.description || "",
      products: 0,
      subcategories: 0,
      status: "Active",
      parent: editingCategory?.parent || "None",
      image: editingCategory?.image || "",
      featured: editingCategory?.featured || false,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
      seoTitle: editingCategory?.seoTitle || "",
      seoDescription: editingCategory?.seoDescription || "",
      sortOrder: categories.length + 1
    }
    setCategories([...categories, newCategory])
    setIsAddDialogOpen(false)
    setEditingCategory(null)
  }

  const handleRefresh = () => {
    alert("Categories data refreshed!")
  }

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Slug,Products,Subcategories,Status,Featured,Created At\n" +
      categories.map(category => 
        `${category.name},${category.slug},${category.products},${category.subcategories},${category.status},${category.featured},${category.createdAt}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "categories.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const totalCategories = categories.length
  const activeCategories = categories.filter(c => c.status === "Active").length
  const totalProducts = categories.reduce((sum, c) => sum + c.products, 0)
  const totalSubcategories = categories.reduce((sum, c) => sum + c.subcategories, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage product categories</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus size={18} className="mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              {activeCategories} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subcategories</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubcategories}</div>
            <p className="text-xs text-muted-foreground">
              Total subcategories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.filter(c => c.featured).length}</div>
            <p className="text-xs text-muted-foreground">
              Featured categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="products">Products</SelectItem>
                <SelectItem value="subcategories">Subcategories</SelectItem>
                <SelectItem value="sortOrder">Sort Order</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Categories Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Products</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Subcategories</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Featured</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{category.name}</span>
                          {category.featured && (
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{category.slug}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {category.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold">{category.products}</div>
                      <div className="text-xs text-muted-foreground">products</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold">{category.subcategories}</div>
                      <div className="text-xs text-muted-foreground">subcategories</div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(category.status)}>
                        {category.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Switch
                        checked={category.featured}
                        onCheckedChange={() => handleToggleFeatured(category.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleView(category)}>
                          <Eye size={16} className="text-primary" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                          <Edit2 size={16} className="text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(category.id)}>
                          {category.status === "Active" ? (
                            <ToggleLeft size={16} className="text-orange-500" />
                          ) : (
                            <ToggleRight size={16} className="text-green-500" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(category.id)}>
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCategories.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No categories found matching your criteria
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Category Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Category Details</DialogTitle>
            <DialogDescription>Complete category information and settings</DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                  <p className="font-semibold">{selectedCategory.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Slug</Label>
                  <p>{selectedCategory.slug}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                  <p>{selectedCategory.description}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Products</Label>
                  <p className="font-semibold">{selectedCategory.products}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Subcategories</Label>
                  <p className="font-semibold">{selectedCategory.subcategories}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <Badge className={getStatusColor(selectedCategory.status)}>
                    {selectedCategory.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Featured</Label>
                  <Badge variant={selectedCategory.featured ? "default" : "secondary"}>
                    {selectedCategory.featured ? "Featured" : "Not Featured"}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Created At</Label>
                  <p>{selectedCategory.createdAt}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Updated At</Label>
                  <p>{selectedCategory.updatedAt}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-muted-foreground">SEO Title</Label>
                  <p>{selectedCategory.seoTitle}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-muted-foreground">SEO Description</Label>
                  <p className="text-sm">{selectedCategory.seoDescription}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update category information</DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={editingCategory.slug}
                    onChange={(e) => setEditingCategory({...editingCategory, slug: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="parent">Parent Category</Label>
                  <Select value={editingCategory.parent} onValueChange={(value) => setEditingCategory({...editingCategory, parent: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      {categories.filter(c => c.id !== editingCategory.id).map(cat => (
                        <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={editingCategory.sortOrder}
                    onChange={(e) => setEditingCategory({...editingCategory, sortOrder: parseInt(e.target.value)})}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={editingCategory.seoTitle}
                    onChange={(e) => setEditingCategory({...editingCategory, seoTitle: e.target.value})}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={editingCategory.seoDescription}
                    onChange={(e) => setEditingCategory({...editingCategory, seoDescription: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={editingCategory.featured}
                  onCheckedChange={(checked) => setEditingCategory({...editingCategory, featured: checked})}
                />
                <Label htmlFor="featured">Featured Category</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Create a new product category</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-name">Name</Label>
                <Input
                  id="new-name"
                  value={editingCategory?.name || ""}
                  onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="new-slug">Slug</Label>
                <Input
                  id="new-slug"
                  value={editingCategory?.slug || ""}
                  onChange={(e) => setEditingCategory({...editingCategory, slug: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="new-description">Description</Label>
                <Textarea
                  id="new-description"
                  value={editingCategory?.description || ""}
                  onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="new-parent">Parent Category</Label>
                <Select value={editingCategory?.parent || "None"} onValueChange={(value) => setEditingCategory({...editingCategory, parent: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="new-sortOrder">Sort Order</Label>
                <Input
                  id="new-sortOrder"
                  type="number"
                  value={editingCategory?.sortOrder || categories.length + 1}
                  onChange={(e) => setEditingCategory({...editingCategory, sortOrder: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="new-featured"
                checked={editingCategory?.featured || false}
                onCheckedChange={(checked) => setEditingCategory({...editingCategory, featured: checked})}
              />
              <Label htmlFor="new-featured">Featured Category</Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>
                Add Category
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
