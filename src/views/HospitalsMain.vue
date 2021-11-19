<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--9">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Selected hospital: </h3>
            </div>
            <div class="card-body">
              <div class="row" style="text-align:center;">
                <div class="col-8 form-group justify-content center">
                  <label for="hospitalSelect"><h2>ere's some data</h2></label>
                  <a href="#!" class="btn btn-primary mt-4">Proceed</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    onCopy(el) {
      var test = document.getElementById(el);
      test.select();
      document.execCommand("copy");
    },
  },
};
</script>

<style></style>
