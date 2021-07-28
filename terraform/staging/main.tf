# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 2.26"
    }
  }

  required_version = ">= 0.14.9"
}

provider "azurerm" {
  features {}

  subscription_id = local.subscription_id
}

/*************
VARIABLES
*************/
locals {
  subscription_id   = "8fcadbae-fcab-4b3d-8654-02501f6af30f"
  project_name      = "FrootLoops"
  environment       = "Staging"
  mainLocation      = "canadacentral"
}

resource "azurerm_resource_group" "rg" {
  name     = "${local.project_name}-${local.environment}"
  location = local.mainLocation
}

/*************
APP SERVICE
*************/
resource "azurerm_app_service_plan" "app_service_plan" {
  name                = "${local.project_name}-app-plan"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  kind = "Linux"
  reserved = true
  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "app" {
  name                    = "${local.project_name}Api-${local.environment}"
  location                = azurerm_resource_group.rg.location
  resource_group_name     = azurerm_resource_group.rg.name
  app_service_plan_id     = azurerm_app_service_plan.app_service_plan.id

  site_config {
    always_on        = true
    http2_enabled    = true
    linux_fx_version = "DOCKER|nginx:latest"
  }

  app_settings = {
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = false
  }

  identity {
    type = "SystemAssigned"
  }
}

/*************
CONTAINER REGISTRY
*************/
resource "azurerm_container_registry" "acr" {
  name                     = "${local.project_name}Acr"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  sku                      = "Basic"
  admin_enabled            = true
}
