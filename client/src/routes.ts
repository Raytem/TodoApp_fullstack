import { CreateTodoPage } from "./pages/CreateTodoPage"
import { EmailVerified } from "./pages/EmailVerified"
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { PageNotFound } from "./pages/PageNotFound"
import { SignUpPage } from "./pages/SignUpPage"
import { TodosPage } from "./pages/TodosPage"

interface Routes {
    path: string,
    Element: React.FC
}

export const routes: Routes[] = [
    { path: 'home', Element: HomePage },
    { path: '/signup', Element: SignUpPage },
    { path: '/login', Element: LoginPage },
    { path: '/todos/createTodo', Element: CreateTodoPage },
    { path: '/emailVerified', Element: EmailVerified },
    { path: '*', Element: PageNotFound }
]

export const authRoutes: Routes[] = [
    ...routes,
    { path: '/todos', Element: TodosPage }
]
