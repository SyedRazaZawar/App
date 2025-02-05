document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    let currentPage = 'login';
    let currentUser = null;
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    let mockUsers = JSON.parse(localStorage.getItem('mockUsers')) || [
      { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin' },
      { id: 2, email: 'employee@example.com', password: 'employee123', role: 'employee' },
      { id: 3, email: 'customer@example.com', password: 'customer123', role: 'customer' },
    ];
  
    const formData = {
      email: '',
      password: '',
      role: 'admin',
      date: '',
      partNumber: '',
      brand: '',
      condition: '',
      subCategory: '',
      price: 0,
      quantity: 0,
      description: '',
      leadTime: '',
      warranty: '',
      additional: '',
      behalfOf: '',
      costPrice: 0,
      cgpo: '',
    };
  
    const render = () => {
      app.innerHTML = '';
      if (currentPage === 'login') {
        renderLogin();
      } else if (currentPage === 'signup') {
        renderSignup();
      } else if (currentPage === 'inventory') {
        renderInventory();
      }
    };
  
    const renderLogin = () => {
      app.innerHTML = `
        <div class="mx-auto mt-20 w-full max-w-md">
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4">Login</h2>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" value="${formData.email}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="mb-4">
              <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input type="password" id="password" name="password" value="${formData.password}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <button id="loginButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Login
            </button>
            <button id="signupButton" class="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign Up
            </button>
          </div>
        </div>
      `;
  
      document.getElementById('loginButton').addEventListener('click', handleLogin);
      document.getElementById('signupButton').addEventListener('click', () => setCurrentPage('signup'));
      document.getElementById('email').addEventListener('input', (e) => formData.email = e.target.value);
      document.getElementById('password').addEventListener('input', (e) => formData.password = e.target.value);
    };
  
    const renderSignup = () => {
      app.innerHTML = `
        <div class="mx-auto mt-20 w-full max-w-md">
          <div class="bg-white shadow-lg rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" value="${formData.email}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="mb-4">
              <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input type="password" id="password" name="password" value="${formData.password}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="mb-4">
              <label for="role" class="block text-gray-700 text-sm font-bold mb-2">Role</label>
              <select id="role" name="role" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="admin" ${formData.role === 'admin' ? 'selected' : ''}>Admin</option>
                <option value="employee" ${formData.role === 'employee' ? 'selected' : ''}>Employee</option>
                <option value="customer" ${formData.role === 'customer' ? 'selected' : ''}>Customer</option>
              </select>
            </div>
            <button id="signupButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
              Sign Up
            </button>
            <button id="loginButton" class="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </button>
          </div>
        </div>
      `;
  
      document.getElementById('signupButton').addEventListener('click', handleSignup);
      document.getElementById('loginButton').addEventListener('click', () => setCurrentPage('login'));
      document.getElementById('email').addEventListener('input', (e) => formData.email = e.target.value);
      document.getElementById('password').addEventListener('input', (e) => formData.password = e.target.value);
      document.getElementById('role').addEventListener('change', (e) => formData.role = e.target.value);
    };
  
    const renderInventory = () => {
      app.innerHTML = `
        <div>
          <header class="bg-blue-500 text-white shadow-lg mb-4">
            <div class="container mx-auto px-4 py-6 flex justify-between items-center">
              <h1 class="text-2xl font-bold">Inventory Management</h1>
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                  <span>${currentUser.email} (${currentUser.role})</span>
                </div>
                <button id="logoutButton" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Logout
                </button>
              </div>
            </div>
          </header>
  
          ${currentUser.role === 'admin' ? `
          <div class="mb-4">
            <div class="bg-white shadow-lg rounded-lg p-6">
              <h2 class="text-2xl font-bold mb-4">User Management</h2>
              <div class="mb-4">
                <label for="userName" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" id="userName" name="userName" value="${formData.email}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div class="mb-4">
                <label for="userRole" class="block text-gray-700 text-sm font-bold mb-2">Role</label>
                <select id="userRole" name="userRole" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <option value="admin" ${formData.role === 'admin' ? 'selected' : ''}>Admin</option>
                  <option value="employee" ${formData.role === 'employee' ? 'selected' : ''}>Employee</option>
                  <option value="customer" ${formData.role === 'customer' ? 'selected' : ''}>Customer</option>
                </select>
              </div>
              <button id="addUserButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add User
              </button>
            </div>
          </div>
          ` : ''}
  
          <div class="mb-4">
            <div class="bg-white shadow-lg rounded-lg p-6">
              <h2 class="text-2xl font-bold mb-4">Inventory Entry</h2>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="date" class="block text-gray-700 text-sm font-bold mb-2">Date</label>
                  <input type="date" id="date" name="date" value="${formData.date}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                  <label for="partNumber" class="block text-gray-700 text-sm font-bold mb-2">Part Number</label>
                  <input type="text" id="partNumber" name="partNumber" value="${formData.partNumber}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                  <label for="brand" class="block text-gray-700 text-sm font-bold mb-2">Brand</label>
                  <input type="text" id="brand" name="brand" value="${formData.brand}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                  <label for="condition" class="block text-gray-700 text-sm font-bold mb-2">Condition</label>
                  <input type="text" id="condition" name="condition" value="${formData.condition}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                  <label for="subCategory" class="block text-gray-700 text-sm font-bold mb-2">Sub-Category</label>
                  <input type="text" id="subCategory" name="subCategory" value="${formData.subCategory}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                  <label for="price" class="block text-gray-700 text-sm font-bold mb-2">Price</label>
                  <input type="number" id="price" name="price" value="${formData.price}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                  <label for="quantity" class="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                  <input type="number" id="quantity" name="quantity" value="${formData.quantity}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                  <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                  <textarea id="description" name="description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${formData.description}</textarea>
                </div>
                <div>
                  <label for="leadTime" class="block text-gray-700 text-sm font-bold mb-2">Lead Time</label>
                  <input type="text" id="leadTime" name="leadTime" value="${formData.leadTime}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                  <label for="warranty" class="block text-gray-700 text-sm font-bold mb-2">Warranty</label>
                  <input type="text" id="warranty" name="warranty" value="${formData.warranty}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                  <label for="additional" class="block text-gray-700 text-sm font-bold mb-2">Additional</label>
                  <input type="text" id="additional" name="additional" value="${formData.additional}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                  <label for="behalfOf" class="block text-gray-700 text-sm font-bold mb-2">Behalf Of</label>
                  <input type="text" id="behalfOf" name="behalfOf" value="${formData.behalfOf}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                  <label for="costPrice" class="block text-gray-700 text-sm font-bold mb-2">Cost Price</label>
                  <input type="number" id="costPrice" name="costPrice" value="${formData.costPrice}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                  <label for="cgpo" class="block text-gray-700 text-sm font-bold mb-2">CGPO</label>
                  <input type="text" id="cgpo" name="cgpo" value="${formData.cgpo}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
              </div>
              <button id="addItemButton" class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Item
              </button>
            </div>
          </div>
  
          <div class="mb-4">
            <div class="bg-white shadow-lg rounded-lg p-6">
              <h2 class="text-2xl font-bold mb-4">Paste Inventory Data</h2>
              <label for="pasteData" class="block text-gray-700 text-sm font-bold mb-2">Paste your Excel data here:</label>
              <textarea id="pasteData" name="pasteData" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Paste your Excel data here..."></textarea>
              <button id="submitPastedEntriesButton" class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                Submit Pasted Entries
              </button>
            </div>
          </div>
  
          <div>
            <div class="bg-white shadow-lg rounded-lg p-6">
              <h2 class="text-2xl font-bold mb-4">Inventory Table</h2>
              <div class="mb-4">
                <label for="search" class="block text-gray-700 text-sm font-bold mb-2">Search by Part Number</label>
                <input type="text" id="search" name="search" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter part number..." />
              </div>
              <table class="w-full border-collapse">
                <thead>
                  <tr>
                    <th class="p-2 border">Date</th>
                    <th class="p-2 border">Part Number</th>
                    <th class="p-2 border">Brand</th>
                    <th class="p-2 border">Condition</th>
                    <th class="p-2 border">Sub-Category</th>
                    <th class="p-2 border">Price</th>
                    <th class="p-2 border">Quantity</th>
                    <th class="p-2 border">Description</th>
                    <th class="p-2 border">Lead Time</th>
                    <th class="p-2 border">Warranty</th>
                    <th class="p-2 border">Additional</th>
                    <th class="p-2 border">Behalf Of</th>
                    <th class="p-2 border">Cost Price</th>
                    <th class="p-2 border">CGPO</th>
                    <th class="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody id="inventoryTableBody">
                  ${inventory.map((item, index) => `
                    <tr>
                      <td class="p-2 border">${item.date}</td>
                      <td class="p-2 border">${item.partNumber}</td>
                      <td class="p-2 border">${item.brand}</td>
                      <td class="p-2 border">${item.condition}</td>
                      <td class="p-2 border">${item.subCategory}</td>
                      <td class="p-2 border">${item.price}</td>
                      <td class="p-2 border">${item.quantity}</td>
                      <td class="p-2 border">${item.description}</td>
                      <td class="p-2 border">${item.leadTime}</td>
                      <td class="p-2 border">${item.warranty}</td>
                      <td class="p-2 border">${item.additional}</td>
                      <td class="p-2 border">${item.behalfOf}</td>
                      <td class="p-2 border">${item.costPrice}</td>
                      <td class="p-2 border">${item.cgpo}</td>
                      <td class="p-2 border">
                        ${canEditItem(item) ? `
                          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2" onclick="editItem(${index})">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                            Edit
                          </button>
                        ` : ''}
                        ${canDeleteItem(item) ? `
                          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onclick="deleteItem(${index})">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            Delete
                          </button>
                        ` : ''}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <button id="manageRowsButton" class="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                Manage Rows
              </button>
            </div>
          </div>
        </div>
      `;
  
      document.getElementById('logoutButton').addEventListener('click', handleLogout);
      document.getElementById('addItemButton').addEventListener('click', handleAddItem);
      document.getElementById('submitPastedEntriesButton').addEventListener('click', handleSubmitPastedEntries);
      document.getElementById('manageRowsButton').addEventListener('click', manageRows);
      document.getElementById('search').addEventListener('input', (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const filteredInventory = inventory.filter(item => item.partNumber.toLowerCase().includes(searchQuery));
        document.getElementById('inventoryTableBody').innerHTML = filteredInventory.map((item, index) => `
          <tr>
            <td class="p-2 border">${item.date}</td>
            <td class="p-2 border">${item.partNumber}</td>
            <td class="p-2 border">${item.brand}</td>
            <td class="p-2 border">${item.condition}</td>
            <td class="p-2 border">${item.subCategory}</td>
            <td class="p-2 border">${item.price}</td>
            <td class="p-2 border">${item.quantity}</td>
            <td class="p-2 border">${item.description}</td>
            <td class="p-2 border">${item.leadTime}</td>
            <td class="p-2 border">${item.warranty}</td>
            <td class="p-2 border">${item.additional}</td>
            <td class="p-2 border">${item.behalfOf}</td>
            <td class="p-2 border">${item.costPrice}</td>
            <td class="p-2 border">${item.cgpo}</td>
            <td class="p-2 border">
              ${canEditItem(item) ? `
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2" onclick="editItem(${index})">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                  Edit
                </button>
              ` : ''}
              ${canDeleteItem(item) ? `
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onclick="deleteItem(${index})">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  Delete
                </button>
              ` : ''}
            </td>
          </tr>
        `).join('');
      });
  
      if (currentUser.role === 'admin') {
        document.getElementById('addUserButton').addEventListener('click', handleSignup);
        document.getElementById('userName').addEventListener('input', (e) => formData.email = e.target.value);
        document.getElementById('userRole').addEventListener('change', (e) => formData.role = e.target.value);
      }
  
      document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', (e) => {
          formData[e.target.name] = e.target.value;
        });
      });
  
      document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', (e) => {
          formData[e.target.name] = e.target.value;
        });
      });
    };
  
    const handleLogin = () => {
      const user = mockUsers.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        currentUser = user;
        setCurrentPage('inventory');
      } else {
        alert('Invalid email or password');
      }
    };
  
    const handleSignup = () => {
      const existingUser = mockUsers.find(u => u.email === formData.email);
      if (existingUser) {
        alert('Email already exists');
        return;
      }
      const newUser = {
        id: mockUsers.length + 1,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };
      mockUsers.push(newUser);
      localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
      currentUser = newUser;
      setCurrentPage('inventory');
    };
  
    const handleLogout = () => {
      currentUser = null;
      setCurrentPage('login');
    };
  
    const handleAddItem = () => {
      const newItem = {
        ...formData,
        id: inventory.length + 1,
        userId: currentUser.id,
      };
      inventory.push(newItem);
      localStorage.setItem('inventory', JSON.stringify(inventory));
      resetFormData();
      render();
    };
  
    const handleEditItem = (index) => {
      const updatedItem = {
        ...formData,
        id: inventory[index].id,
        userId: inventory[index].userId,
      };
      inventory[index] = updatedItem;
      localStorage.setItem('inventory', JSON.stringify(inventory));
      resetFormData();
      render();
    };
  
    const handleDeleteItem = (index) => {
      inventory.splice(index, 1);
      localStorage.setItem('inventory', JSON.stringify(inventory));
      render();
    };
  
    const manageRows = () => {
      const currentDate = new Date().toISOString().split('T')[0];
      const currentItems = inventory.filter(item => item.date === currentDate);
      const previousItems = inventory.filter(item => item.date !== currentDate);
  
      const updatedInventory = currentItems.reduce((acc, currentItem) => {
        const matchingItem = previousItems.find(prevItem =>
          prevItem.partNumber === currentItem.partNumber &&
          prevItem.brand === currentItem.brand &&
          prevItem.condition === currentItem.condition &&
          prevItem.subCategory === currentItem.subCategory
        );
  
        if (matchingItem) {
          const priceDifference = (currentItem.price - matchingItem.price) / matchingItem.price * 100;
          if (priceDifference > 15) {
            acc.push(currentItem);
          } else {
            acc.push({
              ...matchingItem,
              quantity: matchingItem.quantity + currentItem.quantity,
              behalfOf: `${matchingItem.behalfOf}, ${currentItem.behalfOf}`,
              cgpo: `${matchingItem.cgpo}, ${currentItem.cgpo}`,
            });
          }
        } else {
          acc.push(currentItem);
        }
  
        return acc;
      }, previousItems);
  
      inventory = updatedInventory;
      localStorage.setItem('inventory', JSON.stringify(inventory));
      render();
    };
  
    const handleSubmitPastedEntries = () => {
      const pasteData = document.getElementById('pasteData').value;
      const lines = pasteData.trim().split('\n');
      const headers = lines[0].split('\t');
      const parsedData = [];
  
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split('\t');
        const item = {};
  
        headers.forEach((header, index) => {
          switch (header.toLowerCase()) {
            case 'date':
              item.date = values[index];
              break;
            case 'part number':
              item.partNumber = values[index];
              break;
            case 'brand':
              item.brand = values[index];
              break;
            case 'condition':
              item.condition = values[index];
              break;
            case 'sub-category':
              item.subCategory = values[index];
              break;
            case 'price':
              item.price = parseFloat(values[index]) || 0;
              break;
            case 'quantity':
              item.quantity = parseInt(values[index], 10) || 0;
              break;
            case 'description':
              item.description = values[index];
              break;
            case 'lead time':
              item.leadTime = values[index];
              break;
            case 'warranty':
              item.warranty = values[index];
              break;
            case 'additional':
              item.additional = values[index];
              break;
            case 'behalf of':
              item.behalfOf = values[index];
              break;
            case 'cost price':
              item.costPrice = parseFloat(values[index]) || 0;
              break;
            case 'cgpo':
              item.cgpo = values[index];
              break;
            default:
              break;
          }
        });
  
        parsedData.push({
          ...item,
          id: inventory.length + i,
          userId: currentUser.id,
        });
      }
  
      inventory = [...inventory, ...parsedData];
      localStorage.setItem('inventory', JSON.stringify(inventory));
      document.getElementById('pasteData').value = '';
      render();
    };
  
    const canEditItem = (item) => {
      return currentUser.role === 'admin' || (currentUser.role === 'employee' && item.userId === currentUser.id);
    };
  
    const canDeleteItem = (item) => {
      return currentUser.role === 'admin' || (currentUser.role === 'employee' && item.userId === currentUser.id);
    };
  
    const resetFormData = () => {
      formData.email = '';
      formData.password = '';
      formData.role = 'admin';
      formData.date = '';
      formData.partNumber = '';
      formData.brand = '';
      formData.condition = '';
      formData.subCategory = '';
      formData.price = 0;
      formData.quantity = 0;
      formData.description = '';
      formData.leadTime = '';
      formData.warranty = '';
      formData.additional = '';
      formData.behalfOf = '';
      formData.costPrice = 0;
      formData.cgpo = '';
    };
  
    const setCurrentPage = (page) => {
      currentPage = page;
      render();
    };
  
    render();
  });
  
  window.editItem = (index) => {
    const item = inventory[index];
    formData.email = item.email;
    formData.password = item.password;
    formData.role = item.role;
    formData.date = item.date;
    formData.partNumber = item.partNumber;
    formData.brand = item.brand;
    formData.condition = item.condition;
    formData.subCategory = item.subCategory;
    formData.price = item.price;
    formData.quantity = item.quantity;
    formData.description = item.description;
    formData.leadTime = item.leadTime;
    formData.warranty = item.warranty;
    formData.additional = item.additional;
    formData.behalfOf = item.behalfOf;
    formData.costPrice = item.costPrice;
    formData.cgpo = item.cgpo;
    render();
  };
  
  window.deleteItem = (index) => {
    handleDeleteItem(index);
  };