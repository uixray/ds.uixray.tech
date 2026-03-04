---
title: "Button"
type: component
tier: 1
status: seed
version: "0.2.0"
created: 2026-03-04
updated: 2026-03-04
freshness: current
freshness_checked: 2026-03-04
tags: ["type/component"]
platforms: [web]
description: "Auto-generated from Figma"
---

## Кнопка (Button)

Простейший компонент дизайн-системы, с которого обычно всё начинается. Используется для выполнения действий в интерфейсе.

### Свойства

| Prop | Type | Options | Default | Описание |
| --- | --- | --- | --- | --- |
| Size | String | xs / sm / md / lg / xl | md | Размер кнопки |
| Variant | String | primary / secondary / ghost / outline / destructive / link | primary | Вариант стиля кнопки |
| State | String | default / hover / active / focus / disabled / loading | default | Состояние кнопки |
| Has Icon | Boolean | true / false | false | Наличие иконки |
| Icon Position | String | leading / trailing | leading | Положение иконки относительно текста |

### Использование

#### Делайте так:

- Используйте одну кнопку primary CTA на экран.
- В тексте кнопки используйте глаголы, например: «Сохранить», «Отправить».

#### Не делайте так:

- Не используйте кнопку как ссылку для навигации.
- Не перегружайте кнопки иконками.

### Доступность

- Роль элемента должна быть `role=button` (или тег `<button>`).
- `tabindex=0` для обеспечения доступности с клавиатуры.
- Визуальное выделение при фокусе с помощью `focus-visible ring`.
- Контрастность согласно WCAG: не менее 4.5:1 для текста и 3:1 для UI-элементов.

---
📖 [Смотреть в Design System](https://ds.uixray.tech/components/button)