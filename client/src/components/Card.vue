<template>
  <div class="card">
    <router-link tag="a" :to="{name: 'product', params: {id: product._id}}">
      <img class="card-img-top" :src="product.image" :alt="product.name">
    </router-link>
    <div class="card-body">
      <h5 class="card-title text-info">{{product.name}}</h5>
      <p><span class="font-weight-bold">Category</span>: {{product.category}}</p>
      <p class="card-text">{{product.description.substring(0, 50)}}</p>
      <router-link tag="a" class="btn btn-outline-primary mr-2" :to="{name: 'product', params: {id: product._id}}">Description</router-link>
      <button class="btn btn-primary" @click="addToCart(product)">Buy Now</button>
    </div>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins';
export default {
  props: ['product'],
  mixins: [mixins],
};
</script>

<style scoped>
.card {
  width: 100%;
  height: 100%;
}
.card-title {
  cursor: pointer;
}
</style>
