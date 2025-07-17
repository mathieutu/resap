'use client'

import { useState } from 'react'
import {
  Container,
  Paper,
  Title,
  TextInput,
  Button,
  Alert,
  Stack,
  Center,
} from '@mantine/core'
import { IconAlertCircle, IconLock } from '@tabler/icons-react'
import { useAuth } from './AuthProvider'

export function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Petit délai pour simuler une authentification
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), 500)
    })

    const success = login(password)
    if (!success) {
      setError('Mot de passe incorrect')
    }

    setLoading(false)
  }

  return (
    <Center style={{ minHeight: '100vh' }}>
      <Container size="xs">
        <Paper shadow="md" p="xl" radius="md">
          <Stack>
            <Center>
              <IconLock size={48} />
            </Center>

            <Title order={2} ta="center">
              Administration
            </Title>

            <form onSubmit={handleSubmit}>
              <Stack>
                {error && (
                  <Alert
                    icon={<IconAlertCircle size="1rem" />}
                    color="red"
                    variant="light"
                  >
                    {error}
                  </Alert>
                )}

                <TextInput
                  type="password"
                  label="Mot de passe"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <Button
                  type="submit"
                  loading={loading}
                  fullWidth
                >
                  Se connecter
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Container>
    </Center>
  )
}
