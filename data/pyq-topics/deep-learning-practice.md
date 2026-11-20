# Deep Learning Practice: most repeated PYQ topics

IIT Madras BS · Degree level · 90 past questions from 5 papers, sorted into 8 topics.

Practise these papers in a timed exam portal with the official answer key: **[Deep Learning Practice PYQs on BTechi](https://www.btechi.in/pyqs/degree/deep-learning-practice)**. Printable sheets (save as PDF): [all Deep Learning Practice question sheets](https://www.btechi.in/pyqs/degree/deep-learning-practice/sheets), [most repeated questions](https://www.btechi.in/pyqs/degree/deep-learning-practice/sheets/most-repeated).

## Topics, most asked first

| # | Topic | Questions | Share | What they ask |
|---|---|---|---|---|
| 1 | [Convolution & pooling arithmetic](https://www.btechi.in/pyqs/degree/deep-learning-practice/sheets/topic-convolution-and-pooling) | 15 | 17% | Output shapes, parameter and operation counts, padding, pooling code, 1x1 convs and CNN vs MLP |
| 2 | [CNN architectures & transfer learning](https://www.btechi.in/pyqs/degree/deep-learning-practice/sheets/topic-cnn-architectures) | 14 | 16% | AlexNet, VGG, Inception, ResNet, fine-tuning pretrained models and data augmentation |
| 3 | [Object detection & its metrics](https://www.btechi.in/pyqs/degree/deep-learning-practice/sheets/topic-object-detection) | 14 | 16% | R-CNN family, RPN, RoI pooling, YOLO, IoU, precision/recall, F1 and box MAE |
| 4 | [GANs, super-resolution & restoration](https://www.btechi.in/pyqs/degree/deep-learning-practice/sheets/topic-gans-and-restoration) | 14 | 16% | GAN training, SRGAN vs ESRGAN, MPRNet, LAKDNet and PSNR-based image quality |
| 5 | [Speech: ASR, TTS & diarization](https://www.btechi.in/pyqs/degree/deep-learning-practice/sheets/topic-speech-asr-tts) | 11 | 12% | Wav2Vec2, SpeechT5, WER, speaker embeddings, data collators and Trainer arguments for speech |
| 6 | [Fine-tuning LLMs: PEFT & GPU memory](https://www.btechi.in/pyqs/degree/deep-learning-practice/sheets/topic-llm-fine-tuning) | 8 | 9% | Full fine-tuning vs LoRA, RLHF, Hugging Face datasets/Trainer and GPU memory estimates |
| 7 | [Tokenizers & LLM pre-training](https://www.btechi.in/pyqs/degree/deep-learning-practice/sheets/topic-tokenizers-and-pretraining) | 7 | 8% | BPE, WordPiece, SentencePiece, CLM objective, model families and embedding/attention parameter counts |
| 8 | [Segmentation & depth estimation](https://www.btechi.in/pyqs/degree/deep-learning-practice/sheets/topic-segmentation-and-depth) | 7 | 8% | U-Net encoder/decoder, monocular and stereo depth estimation, left-right consistency |

## Question types that come back

These questions are solved with the same steps, in different papers. Learn the method once.

| Question type | Papers | Asked in |
|---|---|---|
| Find the output shape of a conv layer given kernel, stride and padding | 3 | End Term Apr 2025 (AN), End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Replace the final layer of a pretrained CNN for a new number of classes | 3 | End Term Apr 2025 (AN), End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Compute IoU / mean IoU of predicted vs ground-truth bounding boxes | 3 | End Term Apr 2025 (AN), End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Compute the F1 score from predictions or a confusion matrix | 3 | End Term Apr 2025 (AN), End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Pick the Conv2d code that keeps a grayscale image's spatial size | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Find MaxPool2d output size and effective receptive field with dilation | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Order AlexNet, VGG-19, Inception-v3 and ResNet-50 by depth | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Explain why a deeper network does not help on a small image dataset | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Select valid advantages of CNNs over MLPs for images | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Select valid advantages of YOLO over Fast/Faster R-CNN | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Pick the advantages of one CNN architecture over another | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Identify PyTorch code snippets valid for data augmentation | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Select correct statements about GAN training | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Identify correct/incorrect differences between SRGAN and ESRGAN | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Count which listed components belong to the original MPRNet | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Count total operations of parallel 1x1, 3x3 and 5x5 convolutions | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Compute PSNR in dB from a given MSE | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Decide which model is closer to ground truth using PSNR | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Identify the correct statement about the original U-Net layers | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |

## How this was made

Every question in the past papers on BTechi was tagged with exactly one topic. "Questions" counts tagged questions; one paper can have several questions on a topic. Counts cover only the papers on BTechi, not every paper IIT Madras has set, so use them as a guide, not a promise of what will come.

---

[All courses](../README.md) · From [BTechi](https://www.btechi.in), a free, independent study site for the IIT Madras BS. Not affiliated with IIT Madras. Found a mistake? [Open an issue](https://github.com/Btechi/iitm-bs-pyq-topics/issues).
