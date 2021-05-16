const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleEvent = new Event("change");

// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands


// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/fKxAqFLio/";

const recognizer = await createModel();
const classLabels = recognizer.wordLabels();


async function createModel() {
    const checkpointURL = URL + "model.json"; // model topology
    const metadataURL = URL + "metadata.json"; // model metadata

    const recognizer = speechCommands.create(
        "BROWSER_FFT", // fourier transform type, not useful to change
        undefined, // speech commands vocabulary feature, not useful for your models
        checkpointURL,
        metadataURL);

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();

    return recognizer;
}

async function initModel(startListening) {
     // get class labels
    // ["Background Noise", "Clapping", "Not Clapping"]


    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields

    if(startListening){
        recognizer.listen( result=> {
            console.log("start")
            const scores = result.scores; // probability of prediction for each class
            // render the probability scores per class
            for (let i = 0; i < classLabels.length; i++) {
                // const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
                // console.log(classPrediction);
                if(classLabels[i] === "Clapping"){
                    const classScore = result.scores[i].toFixed(2);
                    const classPrediction = classLabels[i] + ": " + classScore;
                    // console.log(classPrediction)
                    if(classScore >= 0.65){
                        toggleSwitch.checked = !toggleSwitch.checked
                        toggleSwitch.dispatchEvent(toggleEvent);
                        console.log(classPrediction);
                    }
                }
            }
        }, {
            includeSpectrogram: true, // in case listen should return result.spectrogram
            probabilityThreshold: 0.75,
            invokeCallbackOnNoiseAndUnknown: true,
            overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
        });
    }else{
        recognizer.stopListening();
    }
    

    // Stop the recognition in 5 seconds.
    // setTimeout(() => recognizer.stopListening(), 5000);
}

export {initModel}
