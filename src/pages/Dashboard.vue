<template>
  <div>
    <h1>Dashboard</h1>
    <RouterLink :to="{ path: '/equipment/new' }">Cadastrar Equipamento</RouterLink>
    <RouterLink :to="{ path: '/equipment/list' }">Listar Equipamentos</RouterLink>
  </div>
</template>