import { Controller } from "@nestjs/common";

@Controller("categories")
export class CategoryController {
    // For now, categories are just strings in the Product model.
    // In the future, we can create a separate Category model and service if needed.
    @Get()
    listCategories() {
        // This is a placeholder. In a real implementation, you would fetch distinct categories from the database.

    }
}