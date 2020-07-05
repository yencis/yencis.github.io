const answer = document.getElementById('answer');
const confidence = document.getElementById('confidence');
const numbers = ["zero","one","two","three","four","five","six","seven","eight","nine"];

function toGrayScale() {
    data = tempCtx.getImageData(0,0,28,28)
    i = data.data;
    for (a = [], u = 0; u < 3136; u += 4) a.push(i[u] / 255);
    return a;
}

async function recognise() {
    let probabilityModel = await tf.loadLayersModel('../model/model.json');
    let res = probabilityModel.predict(tf.tensor([toGrayScale()]));
    let data = res.dataSync()
    console.log(data);

    for (let i = 0; i<=9;i++){
        s = document.getElementById(numbers[i]);
        s.innerText = (data[i]*100).toFixed(3)+"%";
    }

    answer.innerText = data.indexOf(Math.max(...data));
    confidence.innerText = (Math.max(...data) * 100).toFixed(3) + "%";
}
