# Welcome background artwork

Owner-supplied Light Porcelain / Blue Architectural Enamel backgrounds for TASK-GS-UI-WELCOME-001. Source originals remain unchanged outside the repository; only optimized delivery variants are shipped. These are background-only art, not screenshots of a UI, and contain no logo or lettering. The canonical S-Shield remains a separate shared brand asset.

The source filenames do not determine resolution. PNG headers were inspected: this supplied set is 2160×3840 / 2304×3072 / 3072×2304 / 3840×2160, larger than the reviewed copies described in the task. No upscaling was performed.

FFmpeg libwebp, quality90, compression_level6, aspect-preserving downsampling. Origin metadata is stored in companion .webp.json sidecars (the metadata tool fallback for WebP); delivery image bytes and checksums are unaffected.

| Source PNG | Actual source dimensions | Source bytes | Delivery WebP | Output dimensions | Output bytes |
|---|---|---:|---|---|---:|
| `gissino_premium_mobile_2160x3840.png` | 2160×3840 | 6722180 | `mobile.webp` | 1080×1920 | 54846 |
| `gissino_premium_ipad_portrait_2304x3072.png` | 2304×3072 | 5870002 | `tablet-portrait.webp` | 1536×2048 | 72940 |
| `gissino_premium_ipad_landscape_3072x2304.png` | 3072×2304 | 5845366 | `tablet-landscape.webp` | 2048×1536 | 77260 |
| `gissino_premium_desktop_3840x2160.png` | 3840×2160 | 6607935 | `desktop.webp` | 2560×1440 | 92054 |

## Provenance and integrity

- Source `gissino_premium_mobile_2160x3840.png` SHA256: `52e83e38abd02e30c14f5aef406aaad5974a2f4bb55d1118dbf5ebf3db18634c`.
- Delivery `mobile.webp` SHA256: `24f76eaf28a52ef5793cc0af8fe07261adb611dc49d71b181c7a3c579bb4cf64`.
- Source `gissino_premium_ipad_portrait_2304x3072.png` SHA256: `a4f42a5e72402b1200f588d4d99a9994ef4a78e911e6d27158e1f0c5f3bd3c1d`.
- Delivery `tablet-portrait.webp` SHA256: `2732ad11331c408d3379bbe1a9665daf312d23734ec2d9cf4731146db0bd4de8`.
- Source `gissino_premium_ipad_landscape_3072x2304.png` SHA256: `a65c2180e3ac219fccca948a562e087939f1a8667d03de1263d76906a7e4efa6`.
- Delivery `tablet-landscape.webp` SHA256: `bebaeffa6c1f6b1e913a54de1a447825e730a47f4b6a822582ee0c46c6948968`.
- Source `gissino_premium_desktop_3840x2160.png` SHA256: `2baf99b8578d003a1366c08270d548c4aec6030924e61973fc56f5ea5bbb55ff`.
- Delivery `desktop.webp` SHA256: `8faf7a9097b6faa892ddbb06a17d4259729277747daa6eb89b1dd72dd6d5eb1c`.

One art-directed picture chooses desktop at1280px+, tablet variants at600px+ in both axes according to orientation, otherwise mobile. Short phone landscape retains the mobile artwork and a compact two-column content arrangement. Contain/left-bottom positioning preserves complete geometry without stretch or crop; remaining space uses the porcelain ground. Only the matching picture candidate loads.

Owner-supplied provenance is not independent certification of authorship or redistribution rights. No new artwork or logo was generated, traced or recolored.
