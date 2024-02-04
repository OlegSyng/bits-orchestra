import dayjs from 'dayjs'
import dayjsUtcPlugin from 'dayjs/plugin/utc'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from './routes/root'
import { ErrorPage } from './pages/ErrorPage'
import { ProductList } from './pages/ProductList'
import { Reviews } from './pages/Reviews'

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ProductList />
      },
      {
        path: '/reviews',
        element: <Reviews />
      }
    ]
  }
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
