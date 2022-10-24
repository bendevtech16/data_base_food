<template>
  <div class=" ">
        <!-- ====== Hero Section Start -->
    <div
      class="relative pt-[40px] md:pt-[60px] lg:pt-[70px] bg-secondary pb-4"
    >
      <div class="z-50 container">
        <div class="grid p-4 gap-4 grid-cols-1 md:grid-cols-6 bg-white  mt-4">
          <div class="col-span-1 ">
           
            <h3 class="text-2xl text-center">Importez Le fichier Xlsx</h3>
            <div class=" mt-2">
               <input 
                type="file" 
                @change="onChange" 
                  class="
                    w-full
                    rounded-md
                    border
                    bordder-[#E9EDF4]
                    py-3
                    px-5
                    bg-[#FCFDFE]
                    text-base text-body-color
                    placeholder-[#ACB6BE]
                    outline-none
                    focus-visible:shadow-none
                    focus:border-primary
                    transition
                  "
              />
            </div>
            <span
              class="
                mt-4
                w-full
                py-3
                px-6
                sm:px-10
                inline-flex
                items-center
                justify-center
                text-center text-white text-base
                bg-secondary
                border-2 border-secondary
                hover:text-secondary  hover:shadow-lg hover:bg-white 
                font-medium
                rounded-lg
                transition
                duration-300
                ease-in-out cursor-pointer
              "
              @click="validate"
            >
              Charger en BD
            </span>
          <br>

          </div>
          <div class="col-span-5 overflow-auto"> 
            <xlsx-read :file="file">
              <xlsx-sheets>
                <template #default="{sheets}">
                  <select v-model="selectedSheet">
                    <option v-for="sheet in sheets" :key="sheet" :value="sheet">
                      {{ sheet }}
                    </option>
                  </select>
                </template>
              </xlsx-sheets>
              <xlsx-table :sheet="selectedSheet" />
              <xlsx-json :sheet="selectedSheet" id="jsonFromXlsx">
                <template #default="{collection}">
                  <div>
                    {{ collection }}
                  </div>
                </template>
              </xlsx-json>
            </xlsx-read>
          </div>
        </div>
      </div>
    </div>
    <!-- ====== Hero Section End -->
  </div>
</template>

<script>
import XlsxRead from "vue-xlsx/dist/components/XlsxRead"
import XlsxTable from "vue-xlsx/dist/components/XlsxTable"
import XlsxSheets from "vue-xlsx/dist/components/XlsxSheets"
import XlsxJson from "vue-xlsx/dist/components/XlsxJson"

export default {
  components: {
    XlsxRead,
    XlsxTable,
    XlsxSheets,
    XlsxJson,
  },
  data() {
    return {
      file: null,
      selectedSheet: null,
      sheetName: null,
      sheets: [{ name: "SheetOne", data: [{ c: 2 }] }],
      collection: [{ a: 1, b: 2 }]
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    addSheet() {
      this.sheets.push({ name: this.sheetName, data: [...this.collection] });
      this.sheetName = null;
    },
    validate () {
      let datasJSON = document.querySelector('#jsonFromXlsx>div').innerHTML
      datasJSON = JSON.parse(datasJSON)
      console.log(datasJSON)
      this.$store.commit('setDatas', datasJSON)
    }
  }
}
</script>
