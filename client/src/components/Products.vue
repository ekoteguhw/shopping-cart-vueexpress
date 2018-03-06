<template>
  <div>
    <Cards :products="products" />
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <nav aria-label="Page navigation for Shopping Cart">
            <ul class="pagination justify-content-end">
              <li class="page-item" :class="{disabled: prevUrl === ''}">
                <button class="page-link" @click="checkPage(prevUrl)">Previous</button>
              </li>
              <li class="page-item" :class="{disabled: nextUrl === ''}">
                <button class="page-link" @click="checkPage(nextUrl)">Next</button>
              </li>
            </ul>
          </nav>
          <p class="text-center">Page {{currentPage + 1}} from {{pages}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cards from './Cards';
import Api from '@/config/Api';

export default {
  components: {
    Cards,
  },
  data() {
    return {
      products: [],
      currentPage: '',
      pages: '',
      prevUrl: '',
      nextUrl: '',
    };
  },
  created() {
    Api()
      .get('/products')
      .then(response => {
        this.products = response.data.products;
        this.currentPage = response.data.currentPage;
        this.pages = response.data.pages;
        this.nextUrl = response.data.nextUrl;
        this.prevUrl = response.data.prevUrl;
      });
  },
  methods: {
    checkPage(url) {
      Api()
        .get(url)
        .then(response => {
          this.products = response.data.products;
          this.currentPage = response.data.currentPage;
          this.pages = response.data.pages;
          this.nextUrl = response.data.nextUrl;
          this.prevUrl = response.data.prevUrl;
        });
    },
  },
};
</script>

<style scoped>

</style>
