import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectDTO } from './dto/projects.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schema/project.schema';
import { Model, ObjectId, isValidObjectId } from 'mongoose';
import {
  ProjectCreationException,
  ProjectDeletionException,
  ProjectDesignerIdException
} from './exceptions/projects.exception';
import { AuthService } from 'src/auth/auth.service';
import { UpdateProjectDTO } from './dto/UpdateProject.dto';
import { ContactDTO } from './dto/Contact.dto';


@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private readonly ProjectModel: Model<ProjectDocument>,
    private readonly authService: AuthService, // Inject the AuthService here
  ) {
  }

  /**
   * Create a new project.
   * @param createProjectDto The data for creating a project.
   * @returns The newly created project.
   * @throws {ProjectCreationException} If an error occurs while creating the project.
   */
  async create(createProjectDto: ProjectDTO): Promise<ProjectDocument> {
    try {
      // check whether the createProjectDto has the valid DesignerId and is ObjectId of Mongoose
      if (!createProjectDto.designerId || !isValidObjectId(createProjectDto.designerId)) {
        throw new HttpException('Invalid DesignerId', HttpStatus.BAD_REQUEST);
      }

      // if it is a valid designerId then push the objectId of the Project craeted to the user document

      if (this.authService.isDesigner(createProjectDto.designerId)) {
        const project = await this.ProjectModel.create(createProjectDto);
        await this.authService.addProjectToDesigner(createProjectDto.designerId, project._id);
        return project;
      }
    } catch (error) {
      if (error instanceof ProjectDeletionException) {
        throw error;
      }
      throw new ProjectCreationException();
    }
  }

  /**
   * Get all projects.
   * @returns An array of projects.
   * @throws {HttpException} If an error occurs while fetching the projects.
   */
  async findAll(): Promise<ProjectDocument[]> {
    try {
      const projects = await this.ProjectModel.find();
      return projects;
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get a project by ID.
   * @param id The ID of the project to retrieve.
   * @returns The project with the specified ID.
   * @throws {HttpException} If an error occurs while fetching the project.
   */
  async findOne(id: ObjectId): Promise<ProjectDocument | null> {
    try {
      const project = await this.ProjectModel.findById(id);
      return project;
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Update a project by ID.
   * @param id The ID of the project to update.
   * @param updateProjectDto The data for updating the project.
   * @returns The updated project.
   * @throws {ProjectNotFoundException} If the project with the given ID is not found.
   * @throws {ProjectDeletionException} If an error occurs while updating the project.
   * @throws {HttpException} If an error occurs while fetching or updating the project.
   * @throws {ProjectDesignerIdException} If the designerId is not valid.
   */
  async update(id: ObjectId, updateProjectDto: UpdateProjectDTO): Promise<ProjectDocument | null> {
    try {
      // check whether the updateProjectDto has the valid DesignerId and is ObjectId of Mongoose
      if (!updateProjectDto.designerId || !isValidObjectId(updateProjectDto.designerId)) {
        throw new HttpException('Invalid DesignerId', HttpStatus.BAD_REQUEST);
      }
      const result = this.ProjectModel.findByIdAndUpdate(id, updateProjectDto, { new: true });
      return result;
    } catch (error) {
      if (error instanceof ProjectDeletionException) {
        throw error;
      }
      throw new ProjectDesignerIdException();
    }
  }

  /**
   * Delete a project by ID.
   * @param id The ID of the project to delete.
   * @returns The deleted project.
   * @throws {ProjectNotFoundException} If the project with the given ID is not found.
   * @throws {ProjectDeletionException} If an error occurs while deleting the project.
   * @throws {HttpException} If an error occurs while fetching or deleting the project.
   */
  async remove(id: ObjectId): Promise<ProjectDocument | null> {
    try {
      const project = await this.ProjectModel.findByIdAndDelete(id);
      return project;
    } catch (error) {
      throw new ProjectDeletionException();
    }
  }

  /**
   * Receive a Project Proposal from client.
   * @param id The ID of the project to receive proposal.
   * @returns The updated project.
   * @throws {ProjectNotFoundException} If the project with the given ID is not found.
   * @throws {HttpException} If an error occurs while fetching or updating the project.
   */
  async receiveProposal(id:ObjectId ,contactDTO: ContactDTO): Promise<ProjectDocument | null> {
    try {
      const result = this.ProjectModel.findByIdAndUpdate(id, { contacts: contactDTO }, { new: true });
      return result;
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
