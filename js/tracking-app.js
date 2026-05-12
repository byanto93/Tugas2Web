new Vue({

    el: '#app',

    data: {

        nomorDO: "",

        hasil: null,

        sudahCari: false,

        showForm: false,

        pengirimanList:
            dataBahanAjar.pengirimanList,

        paketList:
            dataBahanAjar.paket,

        form: {

            nim: "",

            nama: "",

            ekspedisi: "",

            paket: ""

        }

    },

    computed: {

        selectedPaket(){

            return this.paketList.find(p =>

                p.kode == this.form.paket

            );

        }

    },

    methods: {

        cariDO(){

            this.hasil =
                dataBahanAjar.tracking[this.nomorDO];

            this.sudahCari = true;

        },

        tambahDO(){

            if(
                !this.form.nim ||
                !this.form.nama ||
                !this.form.ekspedisi ||
                !this.form.paket
            ){

                alert("Data belum lengkap");

                return;

            }

            const nomorBaru =
                "DO2025-" +
                String(
                    Object.keys(
                        dataBahanAjar.tracking
                    ).length + 1
                ).padStart(4,'0');

            dataBahanAjar.tracking[nomorBaru] = {

                nim: this.form.nim,

                nama: this.form.nama,

                status: "Diproses",

                ekspedisi: this.form.ekspedisi,

                tanggalKirim:
                    new Date()
                    .toISOString()
                    .split('T')[0],

                paket: this.form.paket,

                total: this.selectedPaket.harga,

                perjalanan: [

                    {

                        waktu:
                        new Date().toLocaleString(),

                        keterangan:
                        "Pesanan dibuat"

                    }

                ]

            };

            alert(
                "DO berhasil dibuat: " +
                nomorBaru
            );

            this.form.nim = "";

            this.form.nama = "";

            this.form.ekspedisi = "";

            this.form.paket = "";

        }

    }

});