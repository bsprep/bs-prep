# Mathematical Foundations of Generative AI: most repeated PYQ topics

IIT Madras BS · Degree level · 81 past questions from 4 papers, sorted into 11 topics.

Practise these papers in a timed exam portal with the official answer key: **[Mathematical Foundations of Generative AI PYQs on BTechi](https://www.btechi.in/pyqs/degree/mathematical-foundations-of-generative-ai)**. Printable sheets (save as PDF): [all Mathematical Foundations of Generative AI question sheets](https://www.btechi.in/pyqs/degree/mathematical-foundations-of-generative-ai/sheets), [most repeated questions](https://www.btechi.in/pyqs/degree/mathematical-foundations-of-generative-ai/sheets/most-repeated).

## Topics, most asked first

| # | Topic | Questions | Share | What they ask |
|---|---|---|---|---|
| 1 | [DDPM: forward & reverse process](https://www.btechi.in/pyqs/degree/mathematical-foundations-of-generative-ai/sheets/topic-ddpm) | 14 | 17% | Noising x_t, closed-form marginals, epsilon-to-mean, posterior coefficients and PyTorch shapes |
| 2 | [VAEs & reparameterisation](https://www.btechi.in/pyqs/degree/mathematical-foundations-of-generative-ai/sheets/topic-variational-autoencoders) | 11 | 14% | Reparameterisation trick, KL to a standard normal, Beta-VAE loss, shapes and parameter counts |
| 3 | [GAN objective & training](https://www.btechi.in/pyqs/degree/mathematical-foundations-of-generative-ai/sheets/topic-gan-objective-training) | 9 | 11% | Optimal discriminator, value function, vanishing gradients, generator losses and layer sizes |
| 4 | [BiGAN, domain adaptation & FID](https://www.btechi.in/pyqs/degree/mathematical-foundations-of-generative-ai/sheets/topic-bigan-evaluation) | 8 | 10% | BiGAN discriminator and cycle error, gradient reversal layers and FID interpretation |
| 5 | [Transformers, attention & decoding](https://www.btechi.in/pyqs/degree/mathematical-foundations-of-generative-ai/sheets/topic-transformers-decoding) | 8 | 10% | Top-k/top-p renormalisation, attention outputs and parameters, layer normalisation |
| 6 | [KL, JS & f-divergences](https://www.btechi.in/pyqs/degree/mathematical-foundations-of-generative-ai/sheets/topic-divergences-f-gan) | 6 | 7% | KL between Gaussians, JS for disjoint supports, f-divergence generators and variational forms |
| 7 | [Wasserstein GAN & optimal transport](https://www.btechi.in/pyqs/degree/mathematical-foundations-of-generative-ai/sheets/topic-wgan-optimal-transport) | 6 | 7% | Transport plans, EMD/W1 distance, critic estimates and weight clipping |
| 8 | [RL for LMs: policy gradient & PPO](https://www.btechi.in/pyqs/degree/mathematical-foundations-of-generative-ai/sheets/topic-rl-for-language-models) | 6 | 7% | LM as an MDP, discounted returns, policy gradient and PPO ratio/clipped objective |
| 9 | [GMMs, EM & the ELBO](https://www.btechi.in/pyqs/degree/mathematical-foundations-of-generative-ai/sheets/topic-gmm-em-elbo) | 5 | 6% | GMM responsibilities, M-step means, ELBO values and optimal decoder variance |
| 10 | [VQ-VAE & codebooks](https://www.btechi.in/pyqs/degree/mathematical-foundations-of-generative-ai/sheets/topic-vq-vae) | 4 | 5% | Nearest-codeword quantisation, commitment loss and latent size in bits |
| 11 | [DDIM sampling & guidance](https://www.btechi.in/pyqs/degree/mathematical-foundations-of-generative-ai/sheets/topic-ddim-guidance) | 4 | 5% | Deterministic DDIM, eta noise scale, DDIM step code and classifier-free guidance |

## Question types that come back

These questions are solved with the same steps, in different papers. Learn the method once.

| Question type | Papers | Asked in |
|---|---|---|
| Count trainable parameters of fully connected generator/encoder layers | 3 | Quiz 2 Aug 2025 (AN), End Term Aug 2025 (AN), Quiz 1 Oct 2025 (AN) |
| Compute the latent z with the reparameterisation trick | 2 | Quiz 2 Aug 2025 (AN), End Term Aug 2025 (AN) |
| Compute the noised sample x_t in the DDPM forward process | 2 | Quiz 2 Aug 2025 (AN), End Term Aug 2025 (FN) |
| Find the GAN generator gradient when supports are disjoint | 2 | End Term Aug 2025 (AN), Quiz 1 Oct 2025 (AN) |
| Compute the output spatial size of (transposed) conv layers | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Pick the PyTorch code for the DDPM mean from predicted noise | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Renormalise token probabilities after top-p/top-k filtering | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Count projection matrix parameters in self-attention | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Evaluate the PPO clipped surrogate objective | 2 | End Term Aug 2025 (AN), End Term Aug 2025 (FN) |
| Identify what the BiGAN discriminator distinguishes/optimises | 2 | End Term Aug 2025 (FN), Quiz 1 Oct 2025 (AN) |

## How this was made

Every question in the past papers on BTechi was tagged with exactly one topic. "Questions" counts tagged questions; one paper can have several questions on a topic. Counts cover only the papers on BTechi, not every paper IIT Madras has set, so use them as a guide, not a promise of what will come.

---

[All courses](../README.md) · From [BTechi](https://www.btechi.in), a free, independent study site for the IIT Madras BS. Not affiliated with IIT Madras. Found a mistake? [Open an issue](https://github.com/Btechi/iitm-bs-pyq-topics/issues).
