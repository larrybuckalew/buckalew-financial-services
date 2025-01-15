# UI Components

## Button

The Button component is a reusable UI element that provides a consistent button styling across the application.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'outline' | 'primary' | The visual style of the button |
| size | 'sm' \| 'md' \| 'lg' | 'md' | The size of the button |
| disabled | boolean | false | Whether the button is disabled |
| className | string | '' | Additional CSS classes |
| onClick | () => void | undefined | Click handler |

### Example Usage

```tsx
import { Button } from '@/components/ui/Button';

<Button 
  variant="primary"
  size="lg"
  onClick={() => console.log('clicked')}
>
  Click Me
</Button>
```

## Card

The Card component provides a consistent container styling for content blocks.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | undefined | Card title |
| className | string | '' | Additional CSS classes |
| footer | ReactNode | undefined | Footer content |
| children | ReactNode | required | Card content |

### Example Usage

```tsx
import { Card } from '@/components/ui/Card';

<Card title="Example Card">
  <p>Card content goes here</p>
</Card>
```

## Input

The Input component provides styled form inputs with optional labels and error states.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | string | 'text' | Input type |
| label | string | undefined | Input label |
| error | string | undefined | Error message |
| value | string | '' | Input value |
| onChange | (e: ChangeEvent) => void | undefined | Change handler |

### Example Usage

```tsx
import { Input } from '@/components/ui/Input';

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
/>
```