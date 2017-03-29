import ControlRecordWrapper from './ControlRecordWrapper';

export default class FormContext {

  constructor(formRecords) {
    this.wrapper = new ControlRecordWrapper(formRecords);
    this.rootRecord = formRecords;
  }

  find(recordTree, name) {
    let records = [];
    if (recordTree.isControl()) {
      let conceptName = recordTree.getConceptName();
      if (!conceptName) {
          conceptName = recordTree.getLabelName();
      }
      if (conceptName === name) {
          records.push(recordTree);
      }
    }
    if (recordTree.children) {
      recordTree.children.forEach(r => {
        const filteredRecords = this.find(r, name);
        records = records.concat(filteredRecords);
      });
    }
    return records;
  }

  get(name, index = 0) {
    const currentRecord = this.find(this.rootRecord, name)[index];
    return this.wrapper.set(currentRecord);
  }

  getRecords() {
    return this.wrapper.getRecords();
  }

}
