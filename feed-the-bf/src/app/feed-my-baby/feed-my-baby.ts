import {Component, inject} from '@angular/core';
import {FirestoreService} from '../services/firestore-service';
import {Step} from '../shared/enums/step';
import {FoodItem} from '../shared/interfaces/food-item';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-feed-my-baby',
  imports: [
    FormsModule
  ],
  templateUrl: './feed-my-baby.html',
  styleUrl: './feed-my-baby.css'
})
export class FeedMyBaby {
  step = Step.START;
  Step = Step;

  selectedMeal: string | null = null;
  selectedTaste: string | null = null;
  selectedOption: string | null = null;
  selectedLunchType: string | null = null;
  selectedProtein: string | null = null;
  selectedVeggies: FoodItem[] = [];
  selectedCarb: string | null = null;
  selectedLegume: string | null = null;

  fruits: FoodItem[] = [];
  nuts: FoodItem[] = [];
  meals: FoodItem[] = [];

  veggies: FoodItem[] = [];
  proteins: FoodItem[] = [];
  carbs: FoodItem[] = [];
  legumes: FoodItem[] = [];

  foodService = inject(FirestoreService);

  chooseYesOrNo(choice: boolean) {
    this.step = choice ? Step.HUNGER_CHECK : Step.GIF;
  }

  hungerCheck(choice: string) {
    this.step = choice === 'Unatkozom' ? Step.UNBORED_TIPS : Step.MEAL_TYPE;
  }

  chooseMeal(meal: string) {
    this.selectedMeal = meal;
    if (meal === 'Nasi') {
      this.step = Step.FOOD_SUGGESTIONS;
    } else if (meal === 'Reggeli' || meal === 'Vacsora') {
      this.step = Step.SWEET_OR_SALTY;
    } else if (meal === 'Ebéd') {
      this.step = Step.LUNCH_FOOD_AVAILABLE;
    }
  }

  chooseTaste(taste: string) {
    this.selectedTaste = taste;
    this.meals = (taste === 'Édes'
        ? this.foodService.sweetMeals
        : this.foodService.saltyMeals
    ).filter(item => item.isAvailable);
    this.step = Step.FOOD_SUGGESTIONS;
  }

  showFruits() {
    this.foodService.getFruits().then(fruits =>
      this.fruits = fruits.filter(f => f.isAvailable)
    );
    this.step = Step.NASI_FRUIT;
  }

  showNuts() {
    this.foodService.getNuts().then(nuts =>
      this.nuts = nuts.filter(n => n.isAvailable)
    );
    this.step = Step.NASI_NUTS;
  }

  // === EBÉD ÁG HANDLEREK ===
  foodInFridge(hasFood: boolean) {
    this.step = hasFood ? Step.LUNCH_EAT_IT : Step.LUNCH_COOK_SOMETHING;
  }

  eatIt(choice: boolean) {
    this.step = choice ? Step.LUNCH_DONE : Step.LUNCH_COOK_SOMETHING;
  }

  cookSomething(choice: boolean) {
    this.step = choice ? Step.LUNCH_MEAL_TYPE : Step.LUNCH_DONE;
  }

  chooseLunchType(type: string) {
    this.selectedLunchType = type;
    this.foodService.getVeggies().then(v =>
      this.veggies = v.filter(x => x.isAvailable)
    );
    this.step = Step.LUNCH_VEGGIES;
  }

  nextLunchStep() {
    switch (this.step) {
      case Step.LUNCH_VEGGIES:
        this.foodService.getProteins().then(p =>
          this.proteins = p.filter(x => x.isAvailable)
        );
        this.step = Step.LUNCH_PROTEIN;
        break;
      case Step.LUNCH_PROTEIN:
        this.foodService.getCarbs().then(c =>
          this.carbs = c.filter(x => x.isAvailable)
        );
        this.step = Step.LUNCH_CARB;
        break;
      case Step.LUNCH_CARB:
        this.foodService.getLegumes().then(l =>
          this.legumes = l.filter(x => x.isAvailable)
        );
        this.step = Step.LUNCH_LEGUME;
        break;
      case Step.LUNCH_LEGUME:
        this.step = Step.LUNCH_DONE;
        break;
    }
  }

  finishLunch() {
    console.log('Lunch summary:', {
      type: this.selectedLunchType,
      veggies: this.selectedVeggies.map(v => v.hu.name),
      protein: this.selectedProtein,
      carb: this.selectedCarb,
      legume: this.selectedLegume
    });
    this.step = Step.LUNCH_DONE;
  }

  reset() {
    this.step = Step.START;
    this.selectedMeal = null;
    this.selectedTaste = null;
    this.selectedOption = null;
    this.selectedLunchType = null;
    this.selectedProtein = null;
    this.selectedVeggies = [];
    this.selectedCarb = null;
    this.selectedLegume = null;
    this.fruits = [];
    this.nuts = [];
    this.meals = [];
    this.veggies = [];
    this.proteins = [];
    this.carbs = [];
    this.legumes = [];
  }
}
