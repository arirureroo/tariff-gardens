# Tariff Gardens

Sup. This is **Tariff Gardens**.

It's a digital garden for **HS Codes** (Harmonization System) and customs tariffs. Basically, I took a bunch of messy HTML files about import/export taxes and made them linkable using **Quartz v4**.

## The Structure

- **`bagian/`**: The 21 main sections.
- **`bab/`**: The 100 chapters with notes.
- **`tarif/`**: The actual tariff tables.
- **`Ketentuan Khusus` / `KUMHS`**: Extra rules.

HS Code format: `AABB.CC.DD` (Chapter.Heading.Subheading.Post).

## Run it

Standard node stuff.

1.  Install:

    ```bash
    npm install
    ```

2.  Run:
    ```bash
    npx quartz build --serve
    ```

Go to `localhost:8080`.

## Help me out

Spot a typo or want to tweak the code? Feel free to send a PR. If it's a huge change, open an issue first. Otherwise, just send it.

Peace.
