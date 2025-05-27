const ROUTES = {
    // Public Routes
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    ABOUT: '/about',
    CONTACT: '/contact',
    
    // Protected Routes
    DIRECT_SERVICE: '/app/direct-service',
    EXTENSION: '/app/extension',
    API_SERVICE: '/app/api-service',
    EXPERT_DETAIL: '/app/expert/:id',
    ACCOUNT: '/app/account',
    
    // Helper function to generate dynamic routes
    expertDetail: (id) => `/app/expert/${id}`,
  };
  
  export default ROUTES;