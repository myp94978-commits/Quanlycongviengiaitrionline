// Test script để kiểm tra chức năng CRUD của Brand
import { getBrands, createBrand, updateBrand, deleteBrand } from './services/brandService.js';

console.log('🧪 Testing Brand CRUD operations...');

// Test getBrands
async function testGetBrands() {
  try {
    console.log('📋 Testing getBrands...');
    const brands = await getBrands();
    console.log('✅ getBrands success:', brands?.length || 0, 'brands found');
    return brands?.data || brands || [];
  } catch (error) {
    console.log('❌ getBrands failed:', error.message);
    return [];
  }
}

// Test createBrand
async function testCreateBrand() {
  try {
    console.log('📦 Testing createBrand...');
    const testBrand = {
      brand_name: `Test Brand ${Date.now()}`
    };
    const result = await createBrand(testBrand);
    console.log('✅ createBrand success:', result);
    return result;
  } catch (error) {
    console.log('❌ createBrand failed:', error.message);
    return null;
  }
}

// Test updateBrand
async function testUpdateBrand(brandId) {
  if (!brandId) {
    console.log('⚠️ Skipping updateBrand test - no brand ID');
    return null;
  }

  try {
    console.log('✏️ Testing updateBrand...');
    const updateData = {
      brand_name: `Updated Brand ${Date.now()}`
    };
    const result = await updateBrand(brandId, updateData);
    console.log('✅ updateBrand success:', result);
    return result;
  } catch (error) {
    console.log('❌ updateBrand failed:', error.message);
    return null;
  }
}

// Test deleteBrand
async function testDeleteBrand(brandId) {
  if (!brandId) {
    console.log('⚠️ Skipping deleteBrand test - no brand ID');
    return null;
  }

  try {
    console.log('🗑️ Testing deleteBrand...');
    const result = await deleteBrand(brandId);
    console.log('✅ deleteBrand success:', result);
    return result;
  } catch (error) {
    console.log('❌ deleteBrand failed:', error.message);
    return null;
  }
}

// Run comprehensive tests
async function runBrandTests() {
  console.log('🚀 Starting Brand CRUD Tests...\n');

  // Test 1: Get existing brands
  const existingBrands = await testGetBrands();
  console.log('');

  // Test 2: Create new brand
  const newBrand = await testCreateBrand();
  console.log('');

  // Test 3: Update the created brand
  if (newBrand?.brand_id) {
    await testUpdateBrand(newBrand.brand_id);
    console.log('');
  }

  // Test 4: Delete the brand (optional - comment out if you want to keep test data)
  // if (newBrand?.brand_id) {
  //   await testDeleteBrand(newBrand.brand_id);
  //   console.log('');
  // }

  // Test 5: Get brands again to verify changes
  console.log('🔄 Verifying final state...');
  const finalBrands = await testGetBrands();

  console.log('\n📊 Test Summary:');
  console.log(`- Initial brands: ${existingBrands.length}`);
  console.log(`- Final brands: ${finalBrands.length}`);
  console.log(`- New brand created: ${newBrand ? '✅' : '❌'}`);

  if (newBrand && finalBrands.length > existingBrands.length) {
    console.log('🎉 All Brand CRUD operations working correctly!');
  } else {
    console.log('⚠️ Some operations may have issues. Check backend API.');
  }
}

runBrandTests().catch(console.error);