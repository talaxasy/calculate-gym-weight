<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@iconify/vue';

const appStore = useAppStore();
const { data: items } = toRefs(appStore);

const addItem = () => {
  items.value.push({
    weight: 0,
    reps: 0,
  });
};

const removeItem = (index: number) => {
  items.value.splice(index, 1);
};

const totalWeight = computed(() => {
  return items.value.reduce((sum, item) => sum + item.weight, 0);
});

const totalReps = computed(() => {
  return items.value.reduce((sum, item) => sum + item.reps, 0);
});

const totalLoad = computed(() => {
  return items.value.reduce((sum, item) => sum + item.weight * item.reps, 0);
});

const totalLoadInTons = computed(() => {
  return (totalLoad.value / 1000).toFixed(2);
});
</script>

<template>
  <div class="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-xl flex flex-col gap-5 p-5 border rounded-md">
      <TheHeader />

      <div v-if="items?.length" class="flex flex-col gap-5">
        <div class="flex gap-3 font-sans">
          <span class="w-20">Вес (кг):</span>
          <span>Повторения:</span>
        </div>
        <ul role="list" class="divide-y divide-border">
          <li
            v-for="(item, index) in items"
            :key="index"
            class="py-4 first:pt-0 last:pb-0 flex gap-3 font-sans"
          >
            <Input
              type="number"
              v-model.number="item.weight"
              min="0"
              class="max-w-20 text-base"
            />
            <NumberField v-model="item.reps" :default-value="0" :min="0">
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput class="text-base" />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
            <AlertDialog>
              <AlertDialogTrigger class="ml-auto">
                <svg
                  class="size-4"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </AlertDialogTrigger>
              <AlertDialogContent class="max-w-xs md:max-w-sm rounded-md">
                <AlertDialogHeader>
                  <AlertDialogTitle
                    >Вы точно хотите удалить элемент?</AlertDialogTitle
                  >
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction @click="removeItem(index)">
                    Удалить
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </li>
        </ul>
      </div>

      <button
        @click="addItem"
        type="button"
        class="relative flex items-center justify-center gap-2 min-h-[40px] w-full rounded-lg border-2 border-dashed group border-gray-300 dark:border-gray-800 dark:hover:border-gray-700 p-6 py-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span
          class="text-sm xxs:text-sm font-semibold text-gray-900 dark:text-gray-600 dark:group-hover:text-white"
        >
          Добавить новый вес
        </span>

        <Icon
          icon="radix-icons:plus"
          class="h-6 w-6 text-gray-400 dark:text-gray-600 dark:group-hover:text-white"
        />
      </button>

      <Separator label="Итого" />

      <div class="font-sans space-y-6 border-border">
        <div class="flex items-center justify-between">
          <dt class="text-sm">Веса</dt>
          <dd class="text-sm font-medium text-gray-900 dark:text-gray-500">
            {{ totalWeight }} кг
          </dd>
        </div>
        <div class="flex items-center justify-between">
          <dt class="text-sm">Повторения</dt>
          <dd class="text-sm font-medium text-gray-900 dark:text-gray-500">
            {{ totalReps }}
          </dd>
        </div>
        <div
          class="flex items-center justify-between border-t border-border pt-6"
        >
          <dt class="text-base font-medium">Результат</dt>
          <dd class="text-base font-medium">
            {{ totalLoad }} кг ({{ totalLoadInTons }} тонн)
          </dd>
        </div>
      </div>

      <TheFooter />
    </div>
  </div>
</template>
