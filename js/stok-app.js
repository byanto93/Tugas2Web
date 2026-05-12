new Vue({

    el: '#app',

    data: {

        stok: dataBahanAjar.stok,

        upbjjList: dataBahanAjar.upbjjList,

        kategoriList: dataBahanAjar.kategoriList,

        filterUpbjj: "",

        filterKategori: "",

        hanyaWarning: false,

        sortBy: "",

        showForm: false,

        form: {

            kode: "",

            judul: "",

            kategori: "",

            upbjj: "",

            lokasiRak: "",

            qty: "",

            safety: "",

            harga: ""

        },

    },

    computed: {

    filteredStok(){

        let hasil = this.stok.filter(item => {

            const cocokUpbjj =
                !this.filterUpbjj ||
                item.upbjj == this.filterUpbjj;

            const cocokKategori =
                !this.filterKategori ||
                item.kategori == this.filterKategori;

            const warning =
                item.qty < item.safety ||
                item.qty == 0;

            if(this.hanyaWarning){

                return cocokUpbjj &&
                       cocokKategori &&
                       warning;

            }

            return cocokUpbjj && cocokKategori;

        });

        if(this.sortBy == "judul"){

            hasil.sort((a,b) =>
                a.judul.localeCompare(b.judul)
            );

        }

        else if(this.sortBy == "qty"){

            hasil.sort((a,b) =>
                a.qty - b.qty
            );

        }

        else if(this.sortBy == "harga"){

            hasil.sort((a,b) =>
                a.harga - b.harga
            );

        }

        return hasil;

    }

    },

    watch:{

    filterUpbjj(){

        alert("UPBJJ berubah, kategori direset");

        this.filterKategori = "";   

    },

    'form.qty'(value){

        if(value < 0){

            alert("Qty tidak boleh negatif");

            this.form.qty = 0;

        }

    }

    },

    methods: {

        resetFilter(){

            this.filterUpbjj = "";

            this.filterKategori = "";

            this.hanyaWarning = false;

            this.sortBy = "";

    },

    tambahData(){

        if(
            !this.form.kode ||
            !this.form.judul ||
            !this.form.kategori ||
            !this.form.upbjj
        ){

            alert("Data belum lengkap");

            return;

        }

        this.stok.push({

            kode: this.form.kode,

            judul: this.form.judul,

            kategori: this.form.kategori,

            upbjj: this.form.upbjj,

            lokasiRak: this.form.lokasiRak,

            qty: parseInt(this.form.qty),

            safety: parseInt(this.form.safety),

            harga: parseInt(this.form.harga),

            catatanHTML: "<b>Data Baru</b>"

        });

        alert("Data berhasil ditambahkan");

        this.form.kode = "";

        this.form.judul = "";

        this.form.kategori = "";

        this.form.upbjj = "";

        this.form.lokasiRak = "";

        this.form.qty = "";

        this.form.safety = "";

        this.form.harga = "";

    },

    editData(item){

    let qtyBaru = prompt(
        "Edit Qty",
        item.qty
    );

    if(qtyBaru !== null){

        item.qty = parseInt(qtyBaru);

    }

    }
}

});