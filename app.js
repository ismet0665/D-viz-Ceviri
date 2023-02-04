// bu api exchangerate günde 1 defa sor yapmaya izin veriyor. ücretli...
const api_key = "ccb046e0a4d0ef8ce5142410";
const url = "https://v6.exchangerate-api.com/v6/" + api_key;

const currency_one = document.getElementById("currency_one");
const currency_two = document.getElementById("currency_two");
const list_one = document.getElementById("list_one");
const list_two = document.getElementById("list_two");
const amount = document.getElementById("amount");
const calculate = document.getElementById("calculate");
const result = document.getElementById("result");
const result2 = document.getElementById("result2");
// aşagıdaki link bilgileri çekmek için diğeri rakamsal deger için
// https://www.exchangerate-api.com/docs/supported-codes-endpoint
// gelen data nın supported_codes kısmında 162 adet verilik array döner.Bu array içinde de 2 elemanlık yine array var. aşagıda her item ın item[0] ve item[1] değerlerini yazdırdık.

fetch(url + "/codes")
  .then((res) => res.json())
  .then((data) => {
    const items = data.supported_codes; //dizinin tamamını aldık.

    let options; //değişken tanımladık
    for (let item of items) {
      options += `<option value=${item[0]}>${item[1]}</option>`;
    }
    list_one.innerHTML = options;
    list_two.innerHTML = options;
  });

// aşagıdaki link. seçilen referans birimin diğer birimlere rakamsal çevrilmiş hali.
// örn eur dan try ye çevrilen değer.
// https://www.exchangerate-api.com/docs/standard-requests
// https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD

calculate.addEventListener("click", function () {
  const doviz1 = currency_one.value;
  const doviz2 = currency_two.value;
  const miktar = amount.value;
  console.log(url + "/latest/" + doviz1);
  fetch(url + "/latest/" + doviz1)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const sonuc = (data.conversion_rates[doviz2] * miktar).toFixed(3);
      result.innerHTML = `
                <div class="card border-primary">
                    <div class="card-body text-center" style="font-size:30px;" >
                        ${miktar} ${doviz1} = ${sonuc} ${doviz2}
                    </div>
                </div>
            `;
    });
});
s;
