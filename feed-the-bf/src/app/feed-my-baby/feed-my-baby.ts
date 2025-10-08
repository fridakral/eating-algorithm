import {Component, inject} from '@angular/core';
import {FirestoreService} from '../services/firestore-service';
import {Step} from '../shared/enums/step';
import {FoodItem} from '../shared/interfaces/food-item';

@Component({
  selector: 'app-feed-my-baby',
  imports: [],
  templateUrl: './feed-my-baby.html',
  styleUrl: './feed-my-baby.css'
})
export class FeedMyBaby {
  step = Step.START;
  Step = Step;

  selectedMeal: string | null = null;
  selectedTaste: string | null = null;

  fruits:FoodItem[] = [];
  nuts:FoodItem[] = [];

  foodService = inject(FirestoreService)

  constructor() {
    this.foodService.getVeggies().then(veggies => console.log(veggies));
  }

  chooseYesOrNo(choice : boolean){
    this.step = choice ? Step.HUNGER_CHECK : Step.GIF;
  }

  hungerCheck(choice: string) {
    if (choice === 'Unatkozom') {
      this.step = Step.UNBORED_TIPS;
    } else {
      this.step = Step.MEAL_TYPE;
    }
  }

  chooseMeal(meal: string) {
    this.selectedMeal = meal;
    if (meal === 'Nasi') {
      this.step = Step.FOOD_SUGGESTIONS;
    } else if (meal === 'Reggeli' || meal === 'Vacsora') {
      this.step = Step.SWEET_OR_SALTY;
    } else {
      // Ebédet majd később
    }
  }

  chooseTaste(taste: string) {
    this.selectedTaste = taste;
    this.step = Step.FOOD_SUGGESTIONS;
  }

  showFruits() {
    this.foodService.getFruits().then(fruits => this.fruits = fruits);
    this.step = Step.NASI_FRUIT;
  }

  showNuts() {
    this.foodService.getNuts().then(nuts => this.nuts = nuts);
    this.step = Step.NASI_NUTS;
  }

  reset() {
    this.step = Step.START;
    this.selectedMeal = null;
    this.selectedTaste = null;
    this.fruits = [];
    this.nuts = [];
  }


}
