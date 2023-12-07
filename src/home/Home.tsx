import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HomeStyle} from './HomeStyle';
import {SafeAreaView} from 'react-native';

export default function Home() {
  const [inputName, setinputName] = useState('');
  const [inputAmount, setinputAmount] = useState('');
  const [type, settype] = useState('');
  const [transactionArray, settransactionArray] = useState([]);
  const [isRadio, setisRadio] = useState('');
  const [income, setincome] = useState('');
  const [expense, setexpense] = useState('');
  const selectIncomRadioFunc = () => {
    setisRadio('INCOME');
  };
  const selectExpenseRadioFunc = () => {
    setisRadio('EXPENSE');
  };
  const addTransactionFunc = () => {
    if (inputName == '' || inputAmount == '') {
      Alert.alert('Please Fill Information');
    } else {
      settransactionArray([
        ...transactionArray,
        {inputName, inputAmount, type: isRadio},
      ]);

      setinputName('');
      setinputAmount('');
    }
  };

  const calculateAmount = () => {
    let inc = 0;
    let exp = 0;
    transactionArray.map(item => {
      const Amount = parseFloat(item.inputAmount);

      item.type === 'INCOME' ? (inc = inc + Amount) : (exp = exp + Amount);
    });
    setincome(inc);
    setexpense(exp);
  };

  useEffect(() => calculateAmount(), [transactionArray]);

  return (
    <View style={HomeStyle.mainContainer}>
      <SafeAreaView>
        <ScrollView style={{width: '100%', height: '100%'}}>
          <Text style={HomeStyle.TitleText}>Expanse Tracker</Text>
          {/* ----------- Your Balance ----------- */}
          <Text style={HomeStyle.yourBalanceText}>YOUR BALANCE</Text>
          <Text style={HomeStyle.yourBalance}>$ {income - expense}</Text>
          <View style={[HomeStyle.incomeAndExpenseView, HomeStyle.boxShadow]}>
            {/* ------------- Income ---------- */}
            <View style={HomeStyle.incomeView}>
              <Text style={HomeStyle.incomeText}>INCOME</Text>
              <Text style={HomeStyle.incomeBalanceText}>${income}</Text>
            </View>
            {/* ------------- Expense ------------ */}
            <View style={HomeStyle.ExpenseView}>
              <Text style={HomeStyle.expenseText}>EXPENSE</Text>
              <Text style={HomeStyle.expenseBalanceText}>${expense}</Text>
            </View>
          </View>
          {/* -------------  History ------------- */}
          <View style={HomeStyle.historyTextView}>
            <Text style={HomeStyle.historyText}>History</Text>
          </View>

          {transactionArray.map((items, index) => {
            return (
              <View
                key={index}
                style={[
                  HomeStyle.transactionList,
                  {
                    borderEndWidth: 8,
                    borderEndColor:
                      items.type == 'INCOME' ? '#66b966' : '#ff5151',
                  },
                ]}>
                <Text style={HomeStyle.listNameText}>{items.inputName}</Text>
                <Text>${items.inputAmount}</Text>
              </View>
            );
          })}

          {/* -------------- Add new transaction ----------- */}
          <View style={HomeStyle.historyTextView}>
            <Text style={HomeStyle.historyText}>Add new transaction</Text>
          </View>

          {/* ----------------- Input Text ------------------- */}
          <View style={HomeStyle.inputView}>
            <Text style={HomeStyle.inputText}>Name</Text>
            <TextInput
              placeholder="Enter Product Name"
              style={[HomeStyle.input, HomeStyle.inputShadow]}
              value={inputName}
              onChangeText={text => setinputName(text)}
            />
          </View>
          <View style={HomeStyle.inputView}>
            <Text style={HomeStyle.inputText}>Amount</Text>

            <TextInput
              placeholder="Enter Amount"
              style={[HomeStyle.input, HomeStyle.inputShadow]}
              value={inputAmount}
              onChangeText={text => setinputAmount(text)}
            />
          </View>
          {/* ----------------- Radio Button --------------- */}

          <View style={HomeStyle.checkboxMainTopContainer}>
            <View style={HomeStyle.checkBoxMainContainer}>
              <TouchableOpacity
                style={HomeStyle.checkBoxUpparView}
                onPress={selectIncomRadioFunc}>
                {isRadio == 'INCOME' ? (
                  <View style={HomeStyle.checkBoxInnerView}></View>
                ) : null}
              </TouchableOpacity>
              <Text>Income</Text>
            </View>

            <View style={HomeStyle.checkBoxMainContainer}>
              <TouchableOpacity
                style={HomeStyle.checkBoxUpparView}
                onPress={selectExpenseRadioFunc}>
                {isRadio == 'EXPENSE' ? (
                  <View style={HomeStyle.checkBoxInnerView}></View>
                ) : null}
              </TouchableOpacity>
              <Text>Expense</Text>
            </View>
          </View>

          {/* --------------- Add Transaction Button ------------- */}

          <TouchableOpacity
            style={[HomeStyle.buttonView, HomeStyle.boxShadow]}
            onPress={addTransactionFunc}>
            <Text style={HomeStyle.buttonText}>Add Transaction</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
