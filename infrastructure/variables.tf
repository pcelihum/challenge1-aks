variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "rg-node-mongo-aks"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "East US"
}

variable "cluster_name" {
  description = "Name of the AKS cluster"
  type        = string
  default     = "aks-node-mongo-cluster"
}

variable "node_count" {
  description = "Number of nodes in the AKS cluster"
  type        = number
  default     = 2
}

variable "node_vm_size" {
  description = "VM size for AKS nodes"
  type        = string
  default     = "Standard_DS2_v2"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "development"
}

variable "db_name" {
  description = "Name of the MongoDB database"
  type        = string
  default     = "productdb"
}