const mealForm = document.getElementById('meal-form');
const mealList = document.getElementById('meal-list');
const shoppingList = document.getElementById('shopping-list');
const clearBtn = document.getElementById('clear-meals');
const filterSelect = document.getElementById('filter-category');

const totalMealsEl = document.getElementById('total-meals');
const totalCaloriesEl = document.getElementById('total-calories');
const avgCaloriesEl = document.getElementById('avg-calories');

const STORAGE_KEY = 'mealMate.meals';

const getMeals = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
const saveMeals = (meals) => localStorage.setItem(STORAGE_KEY, JSON.stringify(meals));

const render = () => {
  const allMeals = getMeals();
  const selected = filterSelect.value;
  const visibleMeals = selected === 'All' ? allMeals : allMeals.filter((meal) => meal.category === selected);

  mealList.innerHTML = '';
  visibleMeals.forEach((meal) => {
    const li = document.createElement('li');
    li.className = 'meal-item';
    li.innerHTML = `
      <h4>${meal.name}</h4>
      <p class="meal-meta">${meal.category} • ${meal.calories} cal</p>
      <p class="meal-meta">Ingredients: ${meal.ingredients.join(', ')}</p>
    `;
    mealList.appendChild(li);
  });

  totalMealsEl.textContent = allMeals.length;
  const totalCalories = allMeals.reduce((sum, meal) => sum + meal.calories, 0);
  totalCaloriesEl.textContent = totalCalories;
  avgCaloriesEl.textContent = allMeals.length ? Math.round(totalCalories / allMeals.length) : 0;

  const ingredientCounts = allMeals
    .flatMap((meal) => meal.ingredients)
    .reduce((acc, ingredient) => {
      acc[ingredient] = (acc[ingredient] || 0) + 1;
      return acc;
    }, {});

  shoppingList.innerHTML = '';
  Object.entries(ingredientCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([ingredient, count]) => {
      const li = document.createElement('li');
      li.textContent = `${ingredient} (${count})`;
      shoppingList.appendChild(li);
    });
};

mealForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const meal = {
    name: document.getElementById('meal-name').value.trim(),
    category: document.getElementById('meal-category').value,
    calories: Number(document.getElementById('meal-calories').value),
    ingredients: document
      .getElementById('meal-ingredients')
      .value.split(',')
      .map((i) => i.trim().toLowerCase())
      .filter(Boolean),
  };

  const meals = getMeals();
  meals.push(meal);
  saveMeals(meals);

  mealForm.reset();
  render();
});

clearBtn.addEventListener('click', () => {
  saveMeals([]);
  render();
});

filterSelect.addEventListener('change', render);

render();
