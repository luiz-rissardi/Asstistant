// Dataset de treinamento
const trainingData = [
    { command: "qual o clima ?", label: 0 },     // 0 = clima
    { command: "como está o tempo ?", label: 0 },
    { command: "de que maneira está o tempo ?", label: 0 },
    { command: "como está o tempo hoje?", label: 0 },
    { command: "de que maneira esta o clima hoje?", label: 0 },
    { command: "qual a temperatura ?", label: 0 },
    { command: "como esta o tempo?", label: 0 },
    { command: "o dia esta bom hoje?", label: 0 },
    { command: "o dia esta bom para programar hoje ?", label: 0 },
    { command: "qual é a previsão para hoje ?", label: 0 },

    { command: "tocar música", label: 1 },     // 1 = música
    { command: "coloca uma playlist", label: 1 },
    { command: "quero ouvir música", label: 1 },
    { command: "tocar musica a thunderstruck", label: 1 },
    { command: "som na faixa ", label: 1 },
    { command: "som na faixa meu rei", label: 1 },
    { command: "tocar a banda acdc", label: 1 },
    { command: "bota minha playlist pra tocar", label: 1 },
    { command: "tocar a playlist de guardioes da galaxia", label: 1 },
    { command: "colocar a playlist de guardioes da galaxia", label: 1 },
    { command: "som na faixa na playlist do journey", label: 1 },

    { command: "ligar a luz", label: 2 },      // 2 = Luz
    { command: "acenda a luz", label: 2 },
    { command: "acender a luz", label: 2 },
    { command: "acender as luzes", label: 2 },
    { command: "ativar a luz", label: 2 },
    { command: "ligar todas as luzes", label: 2 },
    { command: "acender todas as luzes", label: 2 },
    { command: "ligar todas as lampadas", label: 2 },

    { command: "desligar a luz", label: 3 },   // 3 = Desligar Luz
    { command: "apagar a luz", label: 3 },
    { command: "apagar a luz", label: 3 },
    { command: "apagar as luzes", label: 3 },
    { command: "desativar a luz", label: 3 },
    { command: "desligar todas as luzes", label: 3 },
    { command: "deligar as luzes", label: 3 },
    { command: "desligar todas as luzes", label: 3 },

    { command: "façfsdfa fdfsd coisa", label: 4 }, // no pattern
    { command: "abrfsdfsda o nadvsdfsdvesd gadsdfor", label: 4 },
    { command: "defindfa sdffdfsdfufm lembrffete", label: 4 },
    { command: "verfsdfsdfdsdfffdsifiquffdsfef o e-mail", label: 4 },
    { command: "façasdfsfsd uma pdsfsfesquidsffsa dsfa wefdfsdfb", label: 4 },
    { command: "crie sdfudfsdfdfdm ledfsmbfdsfdfrete pfara amasdfsdfsdnhã", label: 4 },
    { command: "inicffisdfdse o Ssdfpotify", label: 4 },
    { command: "gersfe umdfsdfs relafsdfsdftório finsdfdsfanceiro", label: 4 },


];

// Função para converter comandos em vetores numéricos
function encodeCommand(command, maxLength) {
    const charCodes = command.split('').map(char => char.charCodeAt(0) / 255);
    // console.log(maxLength);
    if (maxLength <= 0) {
        throw new Error("maxLength deve ser um número positivo");
    }
    const paddedCharCodes = charCodes.length < maxLength ?
        charCodes.concat(Array(maxLength - charCodes.length).fill(0)) :
        charCodes.slice(0, maxLength);  // Truncate if too long
    return paddedCharCodes;
}

// Função de ativação sigmoid
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

// Derivada da função sigmoid para ajuste dos pesos
function sigmoidDerivative(x) {
    return x * (1 - x);
}

// Função de perda (Mean Squared Error)
function mse(predicted, actual) {
    let sum = 0;
    for (let i = 0; i < predicted.length; i++) {
        sum += Math.pow(predicted[i] - actual[i], 2);
    }
    return sum / predicted.length;
}

function huberLoss(predicted, actual, delta = 1.0) {
    let sum = 0;
    for (let i = 0; i < predicted.length; i++) {
        const error = predicted[i] - actual[i];
        if (Math.abs(error) <= delta) {
            sum += 0.5 * Math.pow(error, 2); // Perda quadrática para erros pequenos
        } else {
            sum += delta * (Math.abs(error) - 0.5 * delta); // Perda absoluta para erros grandes
        }
    }
    return sum / predicted.length;
}

// Inicializar os parâmetros da rede neural
const inputSize = Math.max(...trainingData.map(d => d.command.length));
const hiddenSize = 10;  // Definindo a quantidade de neurônios na camada oculta
const outputSize = 5;  // Agora temos 4 classes diferentes

// Inicialização dos pesos com valores aleatórios
let weightsInputHidden = Array.from({ length: inputSize * hiddenSize }, () => Math.random());
let weightsHiddenOutput = Array.from({ length: hiddenSize * outputSize }, () => Math.random());
let biasHidden = Array.from({ length: hiddenSize }, () => Math.random());
let biasOutput = Array.from({ length: outputSize }, () => Math.random());

// Função para fazer a previsão de uma entrada
function predict(inputVector) {
    // Passo 1: Feedforward
    // Camada Oculta
    let hiddenLayer = [];
    for (let i = 0; i < hiddenSize; i++) {
        let sum = 0;
        for (let j = 0; j < inputSize; j++) {
            sum += inputVector[j] * weightsInputHidden[j + i * inputSize];
        }
        sum += biasHidden[i];
        hiddenLayer[i] = sigmoid(sum);  // Aplicar ativação sigmoid
    }

    // Camada de Saída
    let output = [];
    for (let i = 0; i < outputSize; i++) {
        let sum = 0;
        for (let j = 0; j < hiddenSize; j++) {
            sum += hiddenLayer[j] * weightsHiddenOutput[j + i * hiddenSize];
        }
        sum += biasOutput[i];
        output[i] = sigmoid(sum);  // Aplicar ativação sigmoid para cada saída
    }
    return output;
}

// Função para treinar a rede neural
function train(trainingData, epochs = 70000, learningRate = 0.03, delta = 1.5) {
    const maxLength = inputSize;  // Tamanho fixo das entradas

    for (let epoch = 0; epoch < epochs; epoch++) {
        let totalLoss = 0;

        trainingData.forEach(data => {
            // Etapa de codificação
            const inputVector = encodeCommand(data.command, maxLength);
            const actual = Array(outputSize).fill(0);  // Inicializa vetor de saída esperada
            actual[data.label] = 1;  // Define a posição correta como 1 para o rótulo do comando

            // Feedforward
            const hiddenLayer = [];
            for (let i = 0; i < hiddenSize; i++) {
                let sum = 0;
                for (let j = 0; j < inputSize; j++) {
                    sum += inputVector[j] * weightsInputHidden[j + i * inputSize];
                }
                sum += biasHidden[i];
                hiddenLayer[i] = sigmoid(sum);
            }

            let output = [];
            for (let i = 0; i < outputSize; i++) {
                let sum = 0;
                for (let j = 0; j < hiddenSize; j++) {
                    sum += hiddenLayer[j] * weightsHiddenOutput[j + i * hiddenSize];
                }
                sum += biasOutput[i];
                output[i] = sigmoid(sum);
            }

            // Backpropagation (ajuste dos pesos)
            const outputError = output.map((pred, idx) => actual[idx] - pred);
            const outputDelta = outputError.map((err, idx) => {
                if (Math.abs(err) <= delta) {
                    return err;  // Gradiente da perda quadrática
                } else {
                    return delta * Math.sign(err);  // Gradiente da perda absoluta
                }
            });

            // Ajuste dos pesos da camada de saída
            for (let i = 0; i < outputSize; i++) {
                for (let j = 0; j < hiddenSize; j++) {
                    weightsHiddenOutput[j + i * hiddenSize] += hiddenLayer[j] * outputDelta[i] * learningRate;
                }
                biasOutput[i] += outputDelta[i] * learningRate;
            }

            // Ajuste dos pesos da camada oculta
            for (let i = 0; i < hiddenSize; i++) {
                let hiddenError = 0;
                for (let j = 0; j < outputSize; j++) {
                    hiddenError += outputDelta[j] * weightsHiddenOutput[i + j * hiddenSize];
                }
                const hiddenDelta = hiddenError * sigmoidDerivative(hiddenLayer[i]);
                for (let j = 0; j < inputSize; j++) {
                    weightsInputHidden[j + i * inputSize] += inputVector[j] * hiddenDelta * learningRate;
                }
                biasHidden[i] += hiddenDelta * learningRate;
            }

            // Cálculo da perda total
            totalLoss += huberLoss(output, actual, delta);
        });
        if (epoch % 10000 == 0) {
            console.log(`Epoch ${epoch + 1}: Loss = ${totalLoss}`);
        }
    }
}


// Treinando a rede neural
train(trainingData);

// Testando a rede neural com um comando
function classifyCommand(testCommand) {
    const encodedTestCommand = encodeCommand(testCommand, inputSize);
    const prediction = predict(encodedTestCommand);
    // console.log(prediction);

    // Pega o índice da maior probabilidade prevista
    const predictedLabel = prediction.indexOf(Math.max(...prediction));
    // console.log(predictedLabel);

    // Retorna o rótulo baseado na previsão
    switch (predictedLabel) {
        case 0: return 'Clima';
        case 1: return 'Música';
        case 2: return 'Luz (Ligar)';
        case 3: return 'Luz (Desligar)';
        default: return 'Comando desconhecido';
    }
}

// Exemplo de teste

const commands = [
    "faça uma pesquisa na europa",
    "tocar a banda acdc",
    "tocar a musica thundersturck",
    "colocar a playlist de guardioes da galaxia",
    "som na faixa com a playlist de guardioes da galaxia",
    "como o tempo esta hoje?",
    "como esta o tempo?",
    "qual a previsão do tempo ",
    "qual a previsão do tempo para hoje",
    "acender a luz",
    "acender as luzes",
    "apagar as luzes",
    "apagar as luzes",
    "fazer pesquisa se como fazer um pão",
    "quero um chá quente agora",
    "como eu faço para construir uma rede neural em javascript",
]

commands.map(command => {
    const result = classifyCommand(command);
    console.log(`O comando "${command}" foi classificado como: ${result}`);
})