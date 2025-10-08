import {inject, Injectable} from '@angular/core';
import {collection, Firestore, getDocs} from '@angular/fire/firestore';
import {FoodItem} from '../shared/interfaces/food-item';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore = inject(Firestore);

  private getCollection(key: string): any {
    return collection(this.firestore, key);
  }

  private async getDocs<T>(key: string): Promise<T> {
    const col = this.getCollection(key)
    const snapshot = await getDocs(col);
    return snapshot.docs.map(doc => doc.data()) as T;
  }

  async getVeggies(): Promise<any>{
    return this.getDocs<any>('foods/veggies/items');
  }

  getFruits() {
    return this.getDocs<FoodItem[]>('foods/fruits/items');
  }

  getNuts() {
    return this.getDocs<FoodItem[]>('foods/nuts/items');
  }
}
