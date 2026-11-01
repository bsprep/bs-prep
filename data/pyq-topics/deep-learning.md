# Deep Learning: most repeated PYQ topics

IIT Madras BS · Degree level · 103 past questions from 5 papers, sorted into 9 topics.

Practise these papers in a timed exam portal with the official answer key: **[Deep Learning PYQs on BTechi](https://www.btechi.in/pyqs/degree/deep-learning)**. Printable sheets (save as PDF): [all Deep Learning question sheets](https://www.btechi.in/pyqs/degree/deep-learning/sheets), [most repeated questions](https://www.btechi.in/pyqs/degree/deep-learning/sheets/most-repeated).

## Topics, most asked first

| # | Topic | Questions | Share | What they ask |
|---|---|---|---|---|
| 1 | [Backpropagation by hand](https://www.btechi.in/pyqs/degree/deep-learning/sheets/topic-backpropagation) | 18 | 17% | Forward pass and chain-rule derivatives on small computation graphs |
| 2 | [Convolutional neural networks](https://www.btechi.in/pyqs/degree/deep-learning/sheets/topic-cnn) | 14 | 14% | Conv output size, padding, parameter counts, pooling and gradients through a conv layer |
| 3 | [Transformers & self-attention](https://www.btechi.in/pyqs/degree/deep-learning/sheets/topic-transformers) | 13 | 13% | Q/K/V shapes, multi-head attention, masking, parameter counts and scaled dot-product attention |
| 4 | [MP neurons, perceptrons & towers](https://www.btechi.in/pyqs/degree/deep-learning/sheets/topic-mp-neuron-perceptron) | 11 | 11% | MP neuron thresholds, perceptron learning and bias range, MLP power and sigmoid tower functions |
| 5 | [Feedforward networks & output layers](https://www.btechi.in/pyqs/degree/deep-learning/sheets/topic-feedforward-networks) | 11 | 11% | Output activations and losses, forward pass with sigmoid/softmax, cross-entropy and weight gradients |
| 6 | [Regularization & generalization](https://www.btechi.in/pyqs/degree/deep-learning/sheets/topic-regularization-generalization) | 11 | 11% | Bias-variance curves, overfitting, L2 regularization, dropout, label noise, autoencoders, pretraining |
| 7 | [Gradient descent & optimizers](https://www.btechi.in/pyqs/degree/deep-learning/sheets/topic-gradient-descent-optimizers) | 10 | 10% | Learning rate effects, GD/SGD/mini-batch updates, momentum, adaptive optimizers and Taylor series |
| 8 | [Word embeddings (word2vec/CBOW)](https://www.btechi.in/pyqs/degree/deep-learning/sheets/topic-word-embeddings) | 8 | 8% | Softmax probability of a word given context, greedy generation and embedding update steps |
| 9 | [RNNs, encoder-decoder & attention](https://www.btechi.in/pyqs/degree/deep-learning/sheets/topic-rnn-seq2seq-attention) | 7 | 7% | RNN parameters and loss, encoder-decoder design, attention scores, weights and context vector |

## Question types that come back

These questions are solved with the same steps, in different papers. Learn the method once.

| Question type | Papers | Asked in |
|---|---|---|
| Compute ŷ by a forward pass through a small network | 3 | End Term Apr 2025 (AN), End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Compute a weight derivative by the chain rule in a small network | 3 | End Term Apr 2025 (AN), End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Find the gradient of the loss w.r.t. one kernel element through conv + pooling | 3 | Quiz 2 Aug 2025 (AN), End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Compute P(word \| context) with softmax over word and context embeddings | 3 | End Term Apr 2025 (AN), End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Do one gradient descent update of a word embedding | 3 | End Term Apr 2025 (AN), End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Choose the output activation/loss for a regression target | 2 | End Term Apr 2025 (AN), Quiz 1 Oct 2025 (AN) |
| Find conv output size or padding with (W - F + 2P)/S + 1 | 2 | End Term Apr 2025 (AN), Quiz 2 Aug 2025 (AN) |
| Count the parameters of a convolution layer | 2 | End Term Apr 2025 (AN), Quiz 2 Aug 2025 (AN) |
| Compute intermediate value s1 in the forward pass | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Compute intermediate value s2 in the forward pass | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Evaluate f(1) for the given weights w1 = 1, w2 = -5 | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Evaluate ∂f/∂w1 at given weights and input | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Match loss plots to small, good and too-large learning rates | 2 | End Term Apr 2025 (AN), Quiz 1 Oct 2025 (AN) |
| Judge two statements on training loss, optimization and regularization | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Compute the cross-entropy loss for a given prediction | 2 | Quiz 2 Aug 2025 (AN), Quiz 1 Oct 2025 (AN) |
| Find the conv + ReLU output for a toy image and kernel | 2 | Quiz 2 Aug 2025 (AN), End Term Aug 2025 (FN) |
| Find ŷ after conv and pooling in a toy CNN | 2 | Quiz 2 Aug 2025 (AN), End Term Aug 2025 (FN) |
| Generate a 3-word sentence greedily with a CBOW model | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Find the shape of an attention matrix inside one head | 2 | End Term Apr 2025 (AN), End Term Aug 2025 (AN) |

## How this was made

Every question in the past papers on BTechi was tagged with exactly one topic. "Questions" counts tagged questions; one paper can have several questions on a topic. Counts cover only the papers on BTechi, not every paper IIT Madras has set, so use them as a guide, not a promise of what will come.

---

[All courses](../README.md) · From [BTechi](https://www.btechi.in), a free, independent study site for the IIT Madras BS. Not affiliated with IIT Madras. Found a mistake? [Open an issue](https://github.com/Btechi/iitm-bs-pyq-topics/issues).
