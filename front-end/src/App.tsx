import dayjs from 'dayjs'
import dayjsUtcPlugin from 'dayjs/plugin/utc'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Root } from './routes/root'
import { ErrorPage } from './pages/ErrorPage'
import { Toaster } from './components/ui/toaster'
import { ProductsRoot } from './routes/products'
import { ReviewsRoot } from './routes/reviews'

dayjs.extend(dayjsUtcPlugin)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 5, // 5min
    },
  },
})

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ProductsRoot />
      },
      {
        path: '/reviews',
        element: <ReviewsRoot />
      }
    ]
  }
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
