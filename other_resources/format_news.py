#!/usr/bin/env python3
# format_news.py — reads ./newsfile.tsv and prints <article> cards.


import html

INPUT = "newsfile.tsv"

with open(INPUT, encoding="utf-8") as f:
    for raw in f:
        line = raw.strip()
        if not line or line.lstrip().startswith("#"):
            continue
        parts = [p.strip() for p in line.split("\t")]
        # required fields
        if len(parts) < 5:
            continue
        date, title, author, affil, body = parts[:5]
        link = parts[5] if len(parts) > 5 else ""
        link_text = parts[6] if len(parts) > 6 else "Link"

        # escape everything for safety
        date_h = html.escape(date)
        title_h = html.escape(title)
        author_h = html.escape(author)
        affil_h = html.escape(affil)
        body_h = html.escape(body)
        link_h = html.escape(link, quote=True)
        link_text_h = html.escape(link_text)

        # output the card
        print('  <article class="news-card">')
        print(f'    <span class="news-badge"><time datetime="{date_h}">{date_h}</time></span>')
        print(f'    <h4 class="news-title">{title_h}</h4>')
        print(f'    <p class="news-meta">{author_h}, {affil_h}</p>')
        print(f'    <p class="news-body"><em>{body_h}</em></p>')
        if link:
            print(f'    <p class="news-links"><a href="{link_h}" target="_blank" rel="noopener">{link_text_h}</a></p>')
        print('  </article>')
