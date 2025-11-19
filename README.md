# 📱 Tigo Conecta

<div align="center">

![Ionic](https://img.shields.io/badge/Ionic-7.x-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-16.x-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**Aplicación móvil para gestión y promoción de planes móviles Tigo Ecuador**

[Características](#-características) • [Instalación](#-instalación) • [Configuración](#%EF%B8%8F-configuración) • [Documentación](#-documentación)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Características](#-características)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#%EF%B8%8F-configuración)
- [Base de Datos](#-base-de-datos)
- [Ejecución](#-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Roles y Permisos](#-roles-y-permisos)
- [Funcionalidades por Rol](#-funcionalidades-por-rol)
- [API y Servicios](#-api-y-servicios)
- [Seguridad](#-seguridad)
- [Testing](#-testing)
- [Despliegue](#-despliegue)
- [Solución de Problemas](#-solución-de-problemas)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## 🎯 Descripción General

**Tigo Conecta** es una aplicación móvil multiplataforma desarrollada con Ionic y Angular que permite a Tigo Ecuador gestionar y promocionar sus planes móviles de manera digital. La aplicación implementa un sistema completo de gestión con tres tipos de usuarios, cada uno con diferentes niveles de acceso y funcionalidades.

### ✨ Destacados

- 🔐 Autenticación segura con Supabase
- 💬 Chat en tiempo real entre usuarios y asesores
- 📊 Panel de administración para asesores comerciales
- 🎨 Interfaz moderna y responsive
- 📱 Soporte multiplataforma (Web, Android, iOS)
- 🔄 Actualizaciones en tiempo real con Supabase Realtime
- 🛡️ Row Level Security (RLS) implementado

---

## 🚀 Características

### Para Usuarios Invitados
- ✅ Visualización del catálogo completo de planes
- ✅ Ver detalles de cada plan
- ✅ Comparación de características
- ✅ Sin necesidad de registro

### Para Usuarios Registrados
- ✅ Todas las funciones de invitado
- ✅ Contratar planes móviles
- ✅ Historial de contrataciones
- ✅ Chat en tiempo real con asesores
- ✅ Gestión de perfil personal
- ✅ Notificaciones de estado de contratación

### Para Asesores Comerciales
- ✅ CRUD completo de planes móviles
- ✅ Subida y gestión de imágenes promocionales
- ✅ Visualizar solicitudes de contratación
- ✅ Aprobar/rechazar contrataciones
- ✅ Dashboard administrativo
- ✅ Chat con múltiples clientes
- ✅ Estadísticas y reportes

---

## 🏗️ Arquitectura del Proyecto

```
┌─────────────────┐
│   Ionic App     │
│   (Frontend)    │
└────────┬────────┘
         │
         ├─── Angular Services
         │    ├─ AuthService
         │    ├─ PlanesService
         │    ├─ ContratacionesService
         │    └─ SupabaseService
         │
         ↓
┌─────────────────┐
│   Supabase      │
│   (Backend)     │
├─────────────────┤
│ • PostgreSQL    │
│ • Auth          │
│ • Storage       │
│ • Realtime      │
│ • RLS Policies  │
└─────────────────┘
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Descripción |
|-----------|---------|-------------|
| **Ionic Framework** | 7.x | Framework híbrido para apps móviles |
| **Angular** | 16.x | Framework web de TypeScript |
| **Capacitor** | 5.x | Runtime nativo multiplataforma |
| **TypeScript** | 5.x | Lenguaje de programación tipado |
| **RxJS** | 7.x | Programación reactiva |
| **SCSS** | - | Preprocesador CSS |

### Backend (BaaS)
| Servicio | Uso |
|---------|-----|
| **Supabase PostgreSQL** | Base de datos relacional |
| **Supabase Auth** | Autenticación y gestión de usuarios |
| **Supabase Storage** | Almacenamiento de imágenes |
| **Supabase Realtime** | Actualizaciones en tiempo real |
| **Row Level Security** | Seguridad a nivel de base de datos |

### Herramientas de Desarrollo
- **Node.js** 16+
- **npm** 8+
- **Angular CLI**
- **Ionic CLI**
- **Git**

---

## 📋 Requisitos Previos

Asegúrate de tener instalado:

```bash
# Node.js (16.x o superior)
node --version  # v16.x.x o superior

# npm
npm --version   # 8.x.x o superior

# Ionic CLI
npm install -g @ionic/cli

# Angular CLI
npm install -g @angular/cli
```

### Cuentas Necesarias
- ✅ Cuenta de [Supabase](https://supabase.com) (gratuita)
- ✅ Cuenta de [GitHub](https://github.com) (opcional, para control de versiones)

---

## 💻 Instalación

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/tigo-conecta.git
cd tigo-conecta
```

### 2️⃣ Instalar Dependencias

```bash
npm install
```

### 3️⃣ Verificar Instalación

```bash
ionic info
```

Deberías ver información sobre Ionic, Angular y Capacitor.

---

## ⚙️ Configuración

### 1️⃣ Crear Proyecto en Supabase

1. Ir a [https://supabase.com](https://supabase.com)
2. Crear una cuenta (si no tienes)
3. Crear un nuevo proyecto:
   - **Project Name**: `tigo-conecta`
   - **Database Password**: Guardar en lugar seguro
   - **Region**: Seleccionar la más cercana

4. Esperar a que el proyecto se inicialice (2-3 minutos)

### 2️⃣ Obtener Credenciales de Supabase

1. En tu proyecto de Supabase, ir a **Settings** → **API**
2. Copiar:
   - **Project URL** (ejemplo: `https://uoerdopflayfiafndbdj.supabase.co`)
   - **anon public key** (clave pública)

### 3️⃣ Configurar Variables de Entorno

Editar el archivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'https://uoerdopflayfiafndbdj.supabase.co', // Tu URL
  supabaseKey: 'tu-anon-key-aqui' // Tu anon key
};
```

⚠️ **IMPORTANTE**: 
- No subir este archivo con credenciales reales a repositorios públicos
- Usar variables de entorno en producción

### 4️⃣ Configurar `.gitignore`

Asegurarse de que `.gitignore` incluya:

```gitignore
# Environments
/src/environments/environment.ts
/src/environments/environment.prod.ts
*.env
*.env.local

# IDE
.vscode/
.idea/

# Build
/www
/dist
/platforms
```

---

## 🗄️ Base de Datos

### Ejecutar Schema SQL

1. Ir a tu proyecto en Supabase
2. Abrir **SQL Editor**
3. Copiar y ejecutar el siguiente SQL:

```sql
-- ============================================
-- SCHEMA TIGO CONECTA
-- ============================================

-- 1. TABLA PERFILES
CREATE TABLE IF NOT EXISTS perfiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  rol TEXT CHECK (rol IN ('asesor_comercial', 'usuario_registrado')) 
      DEFAULT 'usuario_registrado',
  nombre TEXT,
  email TEXT,
  telefono TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. TABLA PLANES MÓVILES
CREATE TABLE IF NOT EXISTS planes_moviles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  precio NUMERIC NOT NULL,
  segmento TEXT,
  publico_objetivo TEXT,
  datos_moviles TEXT,
  minutos_voz TEXT,
  sms TEXT,
  velocidad TEXT,
  redes_sociales TEXT,
  whatsapp TEXT,
  llamadas_internacionales TEXT,
  roaming TEXT,
  imagen_url TEXT,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. TABLA CONTRATACIONES
CREATE TABLE IF NOT EXISTS contrataciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES planes_moviles(id) ON DELETE CASCADE,
  fecha TIMESTAMP DEFAULT NOW(),
  estado TEXT CHECK (estado IN ('pendiente', 'aprobada', 'rechazada')) 
         DEFAULT 'pendiente',
  observaciones TEXT
);

-- 4. TABLA MENSAJES CHAT
CREATE TABLE IF NOT EXISTS mensajes_chat (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contratacion_id UUID REFERENCES contrataciones(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE planes_moviles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contrataciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes_chat ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS RLS - PERFILES
-- ============================================

CREATE POLICY "Users can view own profile" 
  ON perfiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" 
  ON perfiles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" 
  ON perfiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- POLÍTICAS RLS - PLANES MÓVILES
-- ============================================

-- Todos pueden ver planes activos
CREATE POLICY "Everyone can view active plans" 
  ON planes_moviles FOR SELECT 
  USING (activo = TRUE);

-- Solo asesores pueden gestionar planes
CREATE POLICY "Advisors can manage all plans" 
  ON planes_moviles FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM perfiles 
      WHERE user_id = auth.uid() 
      AND rol = 'asesor_comercial'
    )
  );

-- ============================================
-- POLÍTICAS RLS - CONTRATACIONES
-- ============================================

-- Usuarios ven sus propias contrataciones
CREATE POLICY "Users can view own contracts" 
  ON contrataciones FOR SELECT 
  USING (auth.uid() = user_id);

-- Usuarios pueden crear sus contrataciones
CREATE POLICY "Users can insert own contracts" 
  ON contrataciones FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Asesores ven y gestionan todas las contrataciones
CREATE POLICY "Advisors can manage all contracts" 
  ON contrataciones FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM perfiles 
      WHERE user_id = auth.uid() 
      AND rol = 'asesor_comercial'
    )
  );

-- ============================================
-- POLÍTICAS RLS - MENSAJES CHAT
-- ============================================

-- Usuarios ven mensajes de sus contrataciones
CREATE POLICY "Users can view messages in own contracts" 
  ON mensajes_chat FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM contrataciones 
      WHERE id = contratacion_id 
      AND user_id = auth.uid()
    )
  );

-- Usuarios envían mensajes en sus contrataciones
CREATE POLICY "Users can insert messages in own contracts" 
  ON mensajes_chat FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM contrataciones 
      WHERE id = contratacion_id 
      AND user_id = auth.uid()
    )
  );

-- Asesores ven y gestionan todos los mensajes
CREATE POLICY "Advisors can manage all messages" 
  ON mensajes_chat FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM perfiles 
      WHERE user_id = auth.uid() 
      AND rol = 'asesor_comercial'
    )
  );

-- ============================================
-- TRIGGERS Y FUNCIONES
-- ============================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para planes_moviles
CREATE TRIGGER update_planes_updated_at
  BEFORE UPDATE ON planes_moviles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- ============================================

CREATE INDEX idx_perfiles_user_id ON perfiles(user_id);
CREATE INDEX idx_perfiles_rol ON perfiles(rol);
CREATE INDEX idx_planes_activo ON planes_moviles(activo);
CREATE INDEX idx_contrataciones_user_id ON contrataciones(user_id);
CREATE INDEX idx_contrataciones_estado ON contrataciones(estado);
CREATE INDEX idx_mensajes_contratacion ON mensajes_chat(contratacion_id);

-- ============================================
-- DATOS INICIALES (OPCIONAL)
-- ============================================

-- Insertar planes de ejemplo
INSERT INTO planes_moviles (nombre, precio, segmento, datos_moviles, minutos_voz, sms, velocidad, activo)
VALUES 
  ('Plan Smart 5GB', 15.99, 'Básico', '5 GB', '100 min', 'Ilimitados', '4G - 50 Mbps', true),
  ('Plan Premium 15GB', 29.99, 'Medio', '15 GB', '300 min', 'Ilimitados', '4G - 100 Mbps', true),
  ('Plan Ilimitado Total', 45.99, 'Premium', 'Ilimitados', 'Ilimitados', 'Ilimitados', '5G - 300 Mbps', true);
```

### Configurar Storage (Opcional)

Si vas a usar imágenes:

1. En Supabase, ir a **Storage**
2. Crear un bucket llamado `planes-imagenes`
3. Configurar como público:
   - Policies → New Policy → Allow public read access

---

## 🏃 Ejecución

### Desarrollo Local

```bash
# Servidor de desarrollo
npm start
# o
ionic serve

# La app se abrirá en http://localhost:4200
```

### Con Live Reload

```bash
ionic serve --lab
```

Esto abre la app en múltiples vistas (iOS, Android, Web).

### Build de Producción

```bash
# Build optimizado
npm run build
# o
ionic build --prod
```

---

## 📁 Estructura del Proyecto

```
TigoConecta/
├── src/
│   ├── app/
│   │   ├── auth/                    # Autenticación
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── core/
│   │   │   ├── guards/              # Guards de ruta
│   │   │   │   ├── auth-guard.ts
│   │   │   │   └── role-guard.ts
│   │   │   └── services/            # Servicios principales
│   │   │       ├── supabase.ts
│   │   │       ├── auth.service.ts
│   │   │       └── ...
│   │   ├── planes/                  # Gestión de planes
│   │   │   ├── planes.ts
│   │   │   ├── catalogo/
│   │   │   └── detalle-plan/
│   │   ├── contrataciones/          # Contrataciones
│   │   │   └── contrataciones.ts
│   │   ├── dashboard/               # Panel asesor
│   │   │   ├── dashboard.page.ts
│   │   │   └── dashboard.page.html
│   │   ├── chat/                    # Chat en tiempo real
│   │   │   ├── chat.page.ts
│   │   │   └── chat.page.html
│   │   ├── app.component.ts
│   │   ├── app-routing.module.ts
│   │   └── app.module.ts
│   ├── environments/
│   │   ├── environment.ts           # ⚠️ NO SUBIR
│   │   └── environment.prod.ts      # ⚠️ NO SUBIR
│   ├── assets/
│   ├── theme/
│   └── index.html
├── angular.json
├── capacitor.config.ts
├── ionic.config.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 👥 Roles y Permisos

### Matriz de Permisos

| Funcionalidad | Invitado | Usuario Registrado | Asesor Comercial |
|--------------|----------|-------------------|------------------|
| Ver catálogo | ✅ | ✅ | ✅ |
| Ver detalles | ✅ | ✅ | ✅ |
| Contratar planes | ❌ | ✅ | ✅ |
| Ver mis contrataciones | ❌ | ✅ | ✅ |
| Chat | ❌ | ✅ | ✅ |
| Crear/editar planes | ❌ | ❌ | ✅ |
| Gestionar contrataciones | ❌ | ❌ | ✅ |
| Dashboard | ❌ | ❌ | ✅ |

---

## 🎭 Funcionalidades por Rol

### 🔓 Usuario Invitado

```typescript
// Rutas accesibles sin autenticación
/catalogo
/detalle-plan/:id
/login
/register
```

**Limitaciones:**
- Solo lectura
- No puede realizar acciones
- Debe registrarse para contratar

### 📱 Usuario Registrado

```typescript
// Rutas adicionales
/usuario/home
/usuario/mis-contrataciones
/usuario/chat/:id
/usuario/perfil
```

**Capacidades:**
- Contratar planes
- Historial de contrataciones
- Chat con asesores
- Gestionar perfil

### 👨‍💼 Asesor Comercial

```typescript
// Rutas exclusivas
/asesor/dashboard
/asesor/planes/crear
/asesor/planes/editar/:id
/asesor/contrataciones
/asesor/chat/:id
```

**Capacidades:**
- CRUD de planes
- Aprobar/rechazar contrataciones
- Chat con todos los clientes
- Estadísticas y reportes

---

## 🔌 API y Servicios

### SupabaseService

Servicio base para interactuar con Supabase:

```typescript
// Métodos principales
getClient(): SupabaseClient
from(table: string): any
insert(table: string, data: any): Promise<any>
update(table: string, id: string, data: any): Promise<any>
remove(table: string, id: string): Promise<any>
uploadFile(bucket: string, path: string, file: File): Promise<any>
getPublicUrl(bucket: string, path: string): string
subscribeToTable(table: string, callback: Function): any
unsubscribeChannel(channel: any): void
```

### PlanesService

Gestión de planes móviles:

```typescript
// Métodos principales
getPlanesActivos(): Promise<Plan[]>
getPlanById(id: string): Promise<Plan>
createPlan(plan: Plan, imageFile?: File): Promise<void>
updatePlan(id: string, plan: Plan, imageFile?: File): Promise<void>
deletePlan(id: string): Promise<void>
subscribeToPlanes(callback: Function): any
```

### ContratacionesService

Gestión de contrataciones:

```typescript
// Métodos principales
getContrataciones(): Promise<Contratacion[]>
getContratacionesPendientes(): Promise<Contratacion[]>
createContratacion(data: any): Promise<void>
aprobarContratacion(id: string): Promise<void>
rechazarContratacion(id: string): Promise<void>
```

---

## 🔒 Seguridad

### Row Level Security (RLS)

Todas las tablas tienen RLS habilitado:

```sql
-- Ejemplo de política
CREATE POLICY "Users can view own contracts" 
  ON contrataciones FOR SELECT 
  USING (auth.uid() = user_id);
```

### Guards de Ruta

```typescript
// AuthGuard - Verifica autenticación
canActivate(): boolean {
  return this.authService.isAuthenticated();
}

// RoleGuard - Verifica rol específico
canActivate(route: ActivatedRouteSnapshot): boolean {
  const requiredRole = route.data['role'];
  return this.authService.hasRole(requiredRole);
}
```

### Validaciones

- ✅ Validación de formularios (Angular Reactive Forms)
- ✅ Validación de tipos de archivo (imágenes)
- ✅ Validación de tamaño de archivo (máx 5MB)
- ✅ Sanitización de inputs
- ✅ CORS configurado en Supabase

---

## 🧪 Testing

### Ejecutar Tests

```bash
# Unit tests
npm test

# E2E tests
npm run e2e

# Coverage
npm run test:coverage
```

### Tests Implementados

```typescript
// Ejemplo: planes.spec.ts
describe('PlanesService', () => {
  it('should fetch active plans', async () => {
    const plans = await service.getPlanesActivos();
    expect(plans).toBeDefined();
    expect(Array.isArray(plans)).toBe(true);
  });
});
```

---

## 🚀 Despliegue

### Compilar APK (Android)

```bash
# 1. Build de producción
ionic build --prod

# 2. Agregar plataforma Android (primera vez)
ionic capacitor add android

# 3. Sincronizar
ionic capacitor sync android

# 4. Abrir en Android Studio
ionic capacitor open android

# 5. En Android Studio:
# Build > Generate Signed Bundle / APK
```

### Desplegar Web

```bash
# Build
ionic build --prod

# Los archivos estarán en ./www
# Subir a tu hosting preferido
```

### Firebase Hosting (Opcional)

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar
firebase init hosting

# Desplegar
firebase deploy
```

---

## 🔧 Solución de Problemas

### Error: "Cannot find module '@supabase/supabase-js'"

```bash
npm install @supabase/supabase-js
```

### Error: "Property does not exist on type"

Verificar que las interfaces estén importadas:

```typescript
import { Plan } from '../planes/planes';
```

### Error de RLS en Supabase

1. Verificar que las políticas estén creadas
2. Verificar que el usuario esté autenticado
3. Revisar logs en Supabase Dashboard

### App no carga en Android

```bash
# Limpiar y reconstruir
ionic capacitor sync android
ionic capacitor copy android
```

---

## 🤝 Contribución

### Cómo Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

### Estándares de Código

- Usar TypeScript estricto
- Seguir guía de estilos de Angular
- Comentar código complejo
- Escribir tests para nuevas funcionalidades
- Usar commits semánticos

---

## 📞 Soporte

### Documentación

- [Ionic Documentation](https://ionicframework.com/docs)
- [Angular Documentation](https://angular.io/docs)
- [Supabase Documentation](https://supabase.com/docs)

### Contacto

- **Proyecto**: TigoConecta
- **Ubicación**: `c:\Users\mateo.paredes\Desktop\Moviles\Examen\TigoConecta`
- **Autor**: Mateo Paredes
- **Email**: mateo.paredes@epn.edu.ec

### Issues

Para reportar bugs o solicitar features:
[Crear Issue en GitHub](https://github.com/tu-usuario/tigo-conecta/issues)

---

## 📄 Licencia

Este proyecto es parte del examen del primer bimestre de Desarrollo de Aplicaciones Móviles - Escuela Politécnica Nacional (EPN).

---

## 🙏 Agradecimientos

- Escuela Politécnica Nacional
- Comunidad de Ionic
- Comunidad de Angular
- Supabase Team

---

<div align="center">

**Desarrollado con ❤️ usando Ionic + Angular + Supabase**

[⬆ Volver arriba](#-tigo-conecta)

</div>
