# Full Stack CMS with Dashboard
![heading_image](https://github.com/andrexcu/cms-admin/assets/137764968/490fadf5-1437-46bb-b8e2-4f430649b7cf)

<!-- Check my front-end ecommerce project using this cms here: https://github.com/andrexcu/store-with-next> -->
## About the project
This project is built using Typescript, Next.js 14, React, Tailwind, Prisma, MongoDB, Zod for validation, 
NextAuth for authentication, Shadcn Library for styles, hookform to manage user input, zustand for 
state management, axios for fetching and posting data to Next API, UpladThing for images, 
Recharts for admin dashboard, Stripe for Payments.

## Project Features
- Authenication:
  - Secure authentication with NextAuth, supporting login through Google or GitHub accounts.
- Store Management:
  - Users (Admin) can create and manage multiple stores.
  - Each store has different products and entities (billboards, categories, colors, sizes).
- Dynamic API Routes: 
  - CMS generates API routes for every store, product, and entity based on ID and dynamic URL.
- CRUD Operations:
  - All CRUD operations are functional and secure, validated through Zod.
- Content Management:
  - Create, read, and update functionality for stores, products, billboards, categories, sizes, and colors.
- Image Handling:
   - Dynamic images for billboards and multiple images for products.
- Visibility and Pagination:
   - Visible API and paginated tables for all products and entities.
- Admin Control:
   - Admin can decide if a product should be featured or archived (changeable anytime).
- Order Management:
   - View customer orders, connected with Stripe webhook.
- Admin Dashboard:
   - Graph for revenue, data for sales and stock.
- User Experience:
   - Light and dark mode support for enhanced user customization.



<br><br><br>


