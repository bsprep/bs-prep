# Large Language Models: most repeated PYQ topics

IIT Madras BS · Degree level · 71 past questions from 4 papers, sorted into 6 topics.

Practise these papers in a timed exam portal with the official answer key: **[Large Language Models PYQs on BTechi](https://www.btechi.in/pyqs/degree/large-language-models)**. Printable sheets (save as PDF): [all Large Language Models question sheets](https://www.btechi.in/pyqs/degree/large-language-models/sheets), [most repeated questions](https://www.btechi.in/pyqs/degree/large-language-models/sheets/most-repeated).

## Topics, most asked first

| # | Topic | Questions | Share | What they ask |
|---|---|---|---|---|
| 1 | [Transformer & self-attention](https://www.btechi.in/pyqs/degree/large-language-models/sheets/topic-transformer-self-attention) | 16 | 23% | Scaled dot-product attention by hand, causal masks, heads, normalisation and parameter/memory counts |
| 2 | [Decoding strategies & teacher forcing](https://www.btechi.in/pyqs/degree/large-language-models/sheets/topic-decoding-strategies) | 12 | 17% | Greedy, beam, exhaustive, top-k/top-p and temperature sampling; teacher forcing in training |
| 3 | [Tokenization: BPE, WordPiece & more](https://www.btechi.in/pyqs/degree/large-language-models/sheets/topic-tokenization) | 12 | 17% | BPE merges and vocab counts, WordPiece scores, Viterbi SentencePiece and subword motivation |
| 4 | [Pretraining, T5, data & scaling laws](https://www.btechi.in/pyqs/degree/large-language-models/sheets/topic-pretraining-scaling) | 11 | 15% | Pretraining objectives, T5 span corruption, data filtering, task mixing and scaling laws |
| 5 | [Positional encodings: relative & ALiBi](https://www.btechi.in/pyqs/degree/large-language-models/sheets/topic-positional-encodings) | 11 | 15% | Sinusoidal encoding, relative positions and clipping, naive relative embeddings and ALiBi biases |
| 6 | [Efficient & sparse attention](https://www.btechi.in/pyqs/degree/large-language-models/sheets/topic-efficient-attention) | 9 | 13% | Sparse/local/global attention masks, block attention permutations and attention sparsity |

## Question types that come back

These questions are solved with the same steps, in different papers. Learn the method once.

| Question type | Papers | Asked in |
|---|---|---|
| Find the most probable tokenization with Viterbi (SentencePiece) | 3 | Quiz 2 Aug 2025 (AN), End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Why subword tokenizers handle rare/OOV words better | 2 | Quiz 2 Aug 2025 (AN), End Term Aug 2025 (FN) |
| Apply the causal look-ahead mask to attention scores | 2 | End Term Aug 2025 (AN), Quiz 1 Oct 2025 (AN) |
| Match attention mask images to sparse attention variants | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Pick common preprocessing steps for BERT-style models | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Compute a word's attention output (sum of elements) from given matrices | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Find an attention score after reordering the input sentence | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Read the block permutation pi from a block attention mask | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Count permutations of pi for n blocks | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Compute the sparsity percentage of a block attention matrix | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| List relative positions j - i for a token | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Find the naive relative position embedding p(j-i) for a token pair | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Compute the combined embedding h_i with naive relative positions | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Compute the pre-attention score e_ij with relative position embeddings | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Identify which decoding strategies are deterministic or random | 2 | End Term Aug 2025 (FN), Quiz 1 Oct 2025 (AN) |

## How this was made

Every question in the past papers on BTechi was tagged with exactly one topic. "Questions" counts tagged questions; one paper can have several questions on a topic. Counts cover only the papers on BTechi, not every paper IIT Madras has set, so use them as a guide, not a promise of what will come.

---

[All courses](../README.md) · From [BTechi](https://www.btechi.in), a free, independent study site for the IIT Madras BS. Not affiliated with IIT Madras. Found a mistake? [Open an issue](https://github.com/Btechi/iitm-bs-pyq-topics/issues).
