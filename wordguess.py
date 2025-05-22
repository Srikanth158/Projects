import random 
from words_list import words
word=random.choice(words)
guessword=['_']*len(word)
attempts=10

while attempts>0:
    print('\nCurrent word: '+ ' '.join(guessword))
    guess=input('Guess a letter:')
    
    if len(guess)!=1 or not guess.isalpha():
          print('Please enter a letter not space')
          continue 
        
    if guess in word:
        for i in range(len(word)):
            if word[i] == guess:
                guessword[i]=guess
        print('Correct guess!')
    else:
        attempts-=1
        print('Wrong guess attempts left: ' +str(attempts))
    
    if '_' not in guessword:
            print('Congrats!!!! \nYou guessed the word \nThe word is: ' +word)
            break
if '_' in guessword:
            print('\nAttempts over \nThe word was: '+word)