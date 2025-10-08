import {inject, Injectable} from '@angular/core';
import {collection, Firestore, getDocs} from '@angular/fire/firestore';
import {FoodItem} from '../shared/interfaces/food-item';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore = inject(Firestore);

  //TODO: upload to firebase
  sweetMeals: FoodItem[] = [
    { isAvailable: true, seasons: ['All'], imageUrl: 'https://placehold.co/300x300', en: {name: 'Oatmeal with frozen fruits', description: 'Warm and healthy breakfast'}, hu: {name: 'Zabkása fagyasztott gyümikkel', description: 'Meleg és egészséges reggeli'} },
    { isAvailable: true, seasons: ['All'], imageUrl: 'https://placehold.co/300x300', en: {name: 'Protein Pancakes', description: 'High protein breakfast'}, hu: {name: 'Proteines palacsinta', description: 'Magas fehérjetartalmú reggeli'} },
    { isAvailable: true, seasons: ['All'], imageUrl: 'https://placehold.co/300x300', en: {name: 'Jam Bread', description: 'Simple sweet bread with jam'}, hu: {name: 'Lekváros kenyér', description: 'Egyszerű édes kenyér lekvárral'} }
  ];

  saltyMeals: FoodItem[] = [
    { isAvailable: true, seasons: ['All'], imageUrl: 'https://placehold.co/300x300', en: {name: 'Egg Sandwich', description: 'Egg spread on bread'}, hu: {name: 'Tojáskrémes kenyér', description: 'Tojáskrémes kenyér'} },
    { isAvailable: true, seasons: ['All'], imageUrl: 'https://placehold.co/300x300', en: {name: 'Avocado Bread', description: 'Avocado on bread'}, hu: {name: 'Avokádós kenyér', description: 'Avokádós kenyér'} },
    { isAvailable: true, seasons: ['All'], imageUrl: 'https://placehold.co/300x300', en: {name: 'Omelette', description: 'Simple egg omelette'}, hu: {name: 'Omlett', description: 'Egyszerű tojásomlett'} }
  ];

  private getCollection(key: string): any {
    return collection(this.firestore, key);
  }

  private async getDocs<T>(key: string): Promise<T> {
    const col = this.getCollection(key)
    const snapshot = await getDocs(col);
    return snapshot.docs.map(doc => doc.data()) as T;
  }

  async getVeggies(): Promise<FoodItem[]>{
    return this.getDocs<FoodItem[]>('foods/veggies/items');
  }

  getFruits() {
    return this.getDocs<FoodItem[]>('foods/fruits/items');
  }

  getNuts() {
    return this.getDocs<FoodItem[]>('foods/nuts/items');
  }
    getProteins() {
    return this.getDocs<FoodItem[]>('foods/proteins/items');
  }
    getLegumes() {
    return this.getDocs<FoodItem[]>('foods/legumes/items');
  }
    getCarbs() {
    return this.getDocs<FoodItem[]>('foods/carbs/items');
  }

}
