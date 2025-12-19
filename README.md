# MedShop

A responsive React Native e-commerce app for medical products built with Expo and TypeScript.

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/6f42e1ff-72be-432a-b8e6-00d7ede0279e" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/9092ad2e-9ddd-4f6f-b772-37977f255ad8" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/6f4686e4-282e-4595-9982-74bca0ec60dc" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/d9e19ec2-2571-47c9-8538-1acb3024c852" width="200"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/80e9a0eb-aecb-4276-965b-159fe9d4a3df" width="200"/></td>
    <td><img src="https://github.com/user-attachments/assets/ef42e94e-2f3d-45d2-a1c7-1379be0ad8f1" width="200"/></td>
  </tr>
</table>
<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/8e08c63b-2611-458d-8c82-0a321a34bc77" width="500"/></td>
  </tr>
</table>


## 🚀 How to Run

### Prerequisites

- Node.js (v16 or later)
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device (for testing)

### Installation & Setup

```bash
# Clone and navigate to the project
cd MedShop

# Install dependencies
npm install

# Start the development server
npm start
```

### Platform-Specific Commands

```bash
# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## 🏗️ State Management & Component Structure

### State Management

The app uses **React's built-in state management** with hooks:

- **Local State**: `useState` for component-specific data
- **Derived State**: `useMemo` for computed values
- **Global State**: Props drilling pattern for shared data

#### Key State Variables

```tsx
// Search and filtering
const [searchText, setSearchText] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");

// Shopping cart - Record<productId, quantity>
const [cartState, setCartState] = useState<Record<SKU["id"], number>>({});

// Computed cart items with totals
const cartItemsList = useMemo(() => {
  // Transforms cartState into enriched CartSKU objects
}, [cartState]);
```

### Component Architecture

```
App.tsx (Root)
├── FilterHeader/
│   ├── Search input
│   └── CategoryChip components
├── ProductCard/ (via FlatList)
│   ├── Product details
│   ├── RxBadge (prescription indicator)
│   └── Quantity controls
└── OrderSummaryPanel/
    ├── Cart items list
    ├── Price calculations
    └── Compact/expanded modes
```

#### Component Responsibilities

- **App.tsx**: Main layout, state management, responsive logic
- **FilterHeader**: Search and category filtering
- **ProductCard**: Individual product display with cart controls
- **OrderSummaryPanel**: Shopping cart summary with dual modes
- **CategoryChip**: Reusable category filter buttons
- **RxBadge**: Prescription requirement indicator

#### Data Flow

1. **Seed Data** → Static product catalog (`SeedData.ts`)
2. **Filtering** → Search text + category selection
3. **Cart Actions** → Quantity changes via `handleQuantityChange`
4. **Computed Values** → Real-time totals and cart items

## 📱 Responsive Design Decisions

### Breakpoint Strategy

```tsx
const isDesktop = width >= 768; // Standard tablet/desktop breakpoint
```

### Layout Patterns

#### Mobile Layout (< 768px)

- **Vertical Stack**: Product feed above cart summary
- **Sticky Cart**: Fixed bottom panel for easy access
- **Compact Mode**: Minimized cart view to save space
- **Full-width**: Components span entire screen width

#### Desktop Layout (≥ 768px)

- **Side-by-side Split**: 2/3 products, 1/3 cart summary
- **Expanded Cart**: Full detailed cart view always visible
- **Max Width**: Container limited to 1200px for readability
- **Border Separation**: Visual separation between panes

### Key Design Principles

1. **Mobile-First**: Default styles optimized for mobile
2. **Progressive Enhancement**: Desktop features added via media queries
3. **Touch-Friendly**: Adequate touch targets for mobile interaction
4. **Content Priority**: Product browsing prioritized on small screens
5. **Context Switching**: Minimize navigation between cart and products

### Performance Optimizations

- **FlatList**: Efficient rendering for product lists
- **useMemo**: Cached filtered data and cart calculations
- **KeyboardAvoidingView**: Better mobile form interaction
- **Responsive Images**: Efficient asset loading

## 🛠️ Tech Stack

- **React Native** (0.81.5) - Cross-platform framework
- **Expo** (~54.0.30) - Development toolchain
- **TypeScript** - Type safety and better DX
- **react-native-safe-area-context** - Safe area handling
