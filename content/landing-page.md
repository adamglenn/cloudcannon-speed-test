---
_schema: page
title: Landing Page
breadcrumbs:
  include_breadcrumbs: true
  link_classes:
content_blocks:
  - _bookshop_name: section/hero
    name: hero-1
    heading:
      text: IT STARTS NOW
      hierarchy: h1
    body_text: >-
      This is a simple hero unit, a simple jumbotron-style component for calling
      extra attention to featured content or information.
    button:
      _bookshop_name: generic/button
      text: Button text
      style: primary
      size: lg
      link: '#'
      link_target: '#'
    background_image: /uploads/people-kyaking.webp
    content_alignment: left
  - _bookshop_name: section/page-collection
    name: page-collection-1
    heading: Page collection headline
    subheading: Subhead goes here.
    hide_collection_pages: true
    collection: content
    exclude_pages:
      - 2
      - 3
      - 6
      - 7
      - 8
      - 9
      - 10
      - 11
      - 12
    limit: 4
    display_image: false
    button_text: Read More
    postscript: Put additional info or <a href="#">links</a> here.
---
