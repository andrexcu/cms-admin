# Full Stack CMS
![heading_image](https://github.com/andrexcu/cms-admin/assets/137764968/490fadf5-1437-46bb-b8e2-4f430649b7cf)

<!-- Check my front-end ecommerce project using this cms here: https://github.com/andrexcu/store-with-next> -->

## ℹ️ About the project
>**This project is a full-stack web application built with a modern tech stack, combining powerful frameworks and libraries to deliver a robust and dynamic user experience.
This CMS project is being used for my front-end ecommerce application. You can explore the corresponding frontend repository here: 
👉 <a href="https://github.com/andrexcu/store-with-next">Store with Next</a>.**
* * * * *
### 🛠️Built With:
- Front End:
  - [TypeScript](https://www.typescriptlang.org/)
  - [Next.js 14](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - [Shadcn Library](https://ui.shadcn.com/) for UI components
  - [hookform](https://react-hook-form.com/) for managing user input
  - [Zustand](https://github.com/pmndrs/zustand) for state management
- Backend:
  - [NextAuth](https://next-auth.js.org/) for authentication
  - [Prisma](https://prisma.io/) for database access
  - [MongoDB](https://www.mongodb.com/) for data storage
  - [Zod](https://github.com/colinhacks/zod) for validation
  - [Axios](https://axios-http.com/) for handling API requests
- Image Handling:
  - [UploadThing](https://uploadthing.com/) for managing and processing images
- Data Visualization:
  - [Recharts](https://recharts.org/) for creating interactive charts in the admin dashboard
- **Payments:**
  - Integration with [Stripe](https://stripe.com/) for secure and seamless payment processing.
* * * * *
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
* * * * *
## 📸 Screenshots of the Project 

<table>
  <tr>
    <td>
      <img src="https://github.com/andrexcu/cms-admin/assets/137764968/ff7c67f8-3a64-40e4-8a82-3c4ac8d32f2b" alt="dashboard" width="500">
    </td>
    <td>
      <img src="https://github.com/andrexcu/cms-admin/assets/137764968/0cf6e7f5-69af-4656-be4c-f074d13f855d" alt="manage" width="500">
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/andrexcu/cms-admin/assets/137764968/9d1bd0cc-822f-4b9c-b7a8-84d2986541c9" alt="products" width="500">   
    </td>
    <td>
      <img src="https://github.com/andrexcu/cms-admin/assets/137764968/1c145eec-e8f9-429f-9c86-136c8410ffca" alt="addproducts" width="500">   
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/andrexcu/cms-admin/assets/137764968/287c6c95-51ad-46e3-9942-0710a1f4129d" alt="billboards" width="500">   
    </td>
    <td>
      <img src="https://github.com/andrexcu/cms-admin/assets/137764968/998cfbd3-3843-476d-9b61-7b4fa337b6b9" alt="categories" width="500">   
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/andrexcu/cms-admin/assets/137764968/4f36d9f1-a78d-4d41-97b8-34723215cad6" alt="orders" width="500">   
    </td>
    <td>
      <img src="https://github.com/andrexcu/cms-admin/assets/137764968/e38923a3-d949-4836-87fc-a3ea79567351" alt="createnewstore" width="500">   
    </td>
  </tr>
    <tr>
    <td>
      <img src="https://github.com/andrexcu/cms-admin/assets/137764968/2e718156-1592-429d-b4a9-2627efc81367" alt="settings" width="500">   
    </td>
    <td>
      <img src="https://github.com/andrexcu/cms-admin/assets/137764968/678874a8-08f4-4472-a609-33defdd004a8" alt="auth" width="500">   
    </td>
  </tr>
</table>

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/andrexcu/cms-admin.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
DATABASE_URL=
NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=


STRIPE_API_KEY=
FRONTEND_STORE_URL=
STRIPE_WEBHOOK_SECRET=
```

### Connect to MongoDB and Push Prisma Schema
```shell
npx prisma generate
npx prisma db push
```


### Start the application

```shell
npm run dev
```

