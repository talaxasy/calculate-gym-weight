<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@iconify/vue';

const colorMode = useColorMode();
</script>

<template>
  <footer class="border-t pt-5 flex justify-between items-center gap-5">
    <p>Made by Lev</p>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline" class="w-fit">
          <Icon
            icon="radix-icons:moon"
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Icon
            icon="radix-icons:sun"
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem @click="colorMode.preference = 'light'">
          Светлая
        </DropdownMenuItem>
        <DropdownMenuItem @click="colorMode.preference = 'dark'">
          Темная
        </DropdownMenuItem>
        <DropdownMenuItem @click="colorMode.preference = 'system'">
          Система
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </footer>
</template>
