import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IRole, Role } from 'app/shared/model/role.model';
import { RoleService } from './role.service';

@Component({
  selector: 'jhi-role-update',
  templateUrl: './role-update.component.html'
})
export class RoleUpdateComponent implements OnInit {
  role: IRole;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    roleName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
    canDelete: []
  });

  constructor(protected roleService: RoleService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ role }) => {
      this.updateForm(role);
      this.role = role;
    });
  }

  updateForm(role: IRole) {
    this.editForm.patchValue({
      id: role.id,
      roleName: role.roleName,
      canDelete: role.canDelete
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const role = this.createFromForm();
    if (role.id !== undefined) {
      this.subscribeToSaveResponse(this.roleService.update(role));
    } else {
      this.subscribeToSaveResponse(this.roleService.create(role));
    }
  }

  private createFromForm(): IRole {
    const entity = {
      ...new Role(),
      id: this.editForm.get(['id']).value,
      roleName: this.editForm.get(['roleName']).value,
      canDelete: this.editForm.get(['canDelete']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRole>>) {
    result.subscribe((res: HttpResponse<IRole>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
