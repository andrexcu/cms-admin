# Full Stack CMS with Dashboard
![heading_image](https://github.com/andrexcu/cms-admin/assets/137764968/490fadf5-1437-46bb-b8e2-4f430649b7cf)

<!-- Check my front-end ecommerce project using this cms here: https://github.com/andrexcu/store-with-next> -->
This backend project serves as the foundation for my front-end ecommerce application. You can explore the corresponding frontend repository here: 
<a href="https://github.com/andrexcu/store-with-next">Store with Next</a>.
## About the project
This project is a full-stack web application built with a modern tech stack, combining powerful frameworks and libraries to deliver a robust and dynamic user experience.
- Front End:
  - TypeScript
  - Next.js 14
  - React
  - Tailwind CSS
  - Shadcn Library for styling
  - hookform for managing user input
  - Zustand for state management
- Backend:
  - NextAuth for authentication
  - Prisma for database access
  - MongoDB for data storage
  - Zod for validation
  - Axios for handling API requests
- Image Handling:
  - UploadThing for managing and processing images
- Data Visualization:
  - Recharts for creating interactive charts in the admin dashboard
- **Payments:**
  - Integration with Stripe for secure and seamless payment processing.
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
   - All images are dynamic, individual image for billboards and multiple images for products.
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


