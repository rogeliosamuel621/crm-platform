/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard' // name that appear in Sidebar
  },
  {
    icon: 'PeopleIcon',
    name: 'Customers',
    routes: [
      {
        path: '/app/customers',
        name: 'List'
      },
      {
        path: '/app/customers/create',
        name: 'Create'
      }
    ]
  },
  {
    icon: 'ProductIcon',
    name: 'Products',
    routes: [
      {
        path: '/app/products',
        name: 'List'
      },
      {
        path: '/app/products/create',
        name: 'Create'
      }
    ]
  },
  {
    icon: 'FormsIcon',
    name: 'Orders',
    routes: [
      {
        path: '/app/orders',
        name: 'List'
      },
      {
        path: '/app/orders/create',
        name: 'Create'
      }
    ]
  }
];

export default routes;
