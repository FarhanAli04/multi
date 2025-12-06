"use client"

import { Plus, Search, Star, Edit2, Trash2, Eye, RefreshCw, Download, Package } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Product {
  id: number;
  name: string;
  sku: string;
  vendor: string;
  price: string;
  stock: number;
  rating: number;
  status: string;
  category: string;
  description: string;
  image: string;
}

export default function ProductsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Wireless Headphones",
      sku: "WH-2024-001",
      vendor: "Tech Store",
      price: "$89.99",
      stock: 245,
      rating: 4.5,
      status: "Active",
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation",
      image: "/api/placeholder/200/200"
    },
    {
      id: 2,
      name: "USB-C Cable",
      sku: "USB-2024-002",
      vendor: "Electronics Pro",
      price: "$12.99",
      stock: 1203,
      rating: 4.2,
      status: "Active",
      category: "Electronics",
      description: "Fast charging USB-C cable, 2m length",
      image: "/api/placeholder/200/200"
    },
    {
      id: 3,
      name: "Phone Case",
      sku: "PC-2024-003",
      vendor: "Fashion Hub",
      price: "$24.99",
      stock: 89,
      rating: 3.8,
      status: "Inactive",
      category: "Fashion",
      description: "Protective phone case with modern design",
      image: "/api/placeholder/200/200"
    },
  ])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleView = (product: Product) => {
    setSelectedProduct(product)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct({...product})
    setIsEditDialogOpen(true)
  }

  const handleDelete = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(product => product.id !== productId))
    }
  }

  const handleToggleStatus = (productId: number) => {
    setProducts(products.map(product =>
      product.id === productId
        ? { ...product, status: product.status === "Active" ? "Inactive" : "Active" }
        : product
    ))
  }

  const handleRefresh = () => {
    alert("Products data refreshed!")
  }

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Product Name,SKU,Vendor,Price,Stock,Rating,Status,Category\n" +
      products.map(product => 
        `${product.name},${product.sku},${product.vendor},${product.price},${product.stock},${product.rating},${product.status},${product.category}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "products.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSaveEdit = () => {
    if (editingProduct) {
      setProducts(products.map(product => 
        product.id === editingProduct.id ? editingProduct : product
      ))
      setIsEditDialogOpen(false)
      setEditingProduct(null)
    }
  }

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getStockColor = (stock: number) => {
    if (stock > 100) return "text-green-600"
    if (stock > 10) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products Management</h1>
          <p className="text-muted-foreground mt-1">Manage vendor and in-house products</p>
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
            Add Product
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by product name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Fashion">Fashion</SelectItem>
            <SelectItem value="Home & Garden">Home & Garden</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => {setSearchTerm(""); setCategoryFilter("all")}}>
          Clear Filters
        </Button>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">SKU</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Vendor</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Rating</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                          <Package size={20} className="text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{product.sku}</td>
                    <td className="px-4 py-3">{product.vendor}</td>
                    <td className="px-4 py-3 text-primary font-semibold">{product.price}</td>
                    <td className="px-4 py-3">
                      <span className={getStockColor(product.stock)}>{product.stock}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={getStatusColor(product.status)}>
                        {product.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(product)}>
                          <Eye size={16} className="text-primary" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                          <Edit2 size={16} className="text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(product.id)}>
                          <div className={`w-4 h-4 rounded-full ${product.status === "Active" ? "bg-red-500" : "bg-green-500"}`} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)}>
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No products found matching your criteria
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Product Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>View complete product information</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                  <p className="font-semibold">{selectedProduct.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">SKU</label>
                  <p>{selectedProduct.sku}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Vendor</label>
                  <p>{selectedProduct.vendor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <p>{selectedProduct.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Price</label>
                  <p className="font-semibold text-lg text-primary">{selectedProduct.price}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Stock</label>
                  <p className={getStockColor(selectedProduct.stock)}>{selectedProduct.stock} units</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rating</label>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span>{selectedProduct.rating}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className={getStatusColor(selectedProduct.status)}>
                    {selectedProduct.status}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p>{selectedProduct.description}</p>
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

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product information</DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                  <Input
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">SKU</label>
                  <Input
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({...editingProduct, sku: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Vendor</label>
                  <Input
                    value={editingProduct.vendor}
                    onChange={(e) => setEditingProduct({...editingProduct, vendor: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Price</label>
                  <Input
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Stock</label>
                  <Input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rating</label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={editingProduct.rating}
                    onChange={(e) => setEditingProduct({...editingProduct, rating: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <Input
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  />
                </div>
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
    </div>
  )
}
